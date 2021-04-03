import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import { useSession, signIn, signOut } from 'next-auth/client';
import { Box, Button, Popover, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import {
  faBell,
  faUserCircle,
  faShapes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useUser } from '../context/UserContext';
import styles from '../../styles/Nav.module.scss';

const getUser = async (email: string) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';
  try {
    const data = await axios.post(`${API_URL}/graphql`, {
      query: `query GET_USER ($email: String!) {
        users(where: {email:$email}){
          id
          email
          username
          problems {
            id
          }
          problemsByDifficulty
          problemsByGroup
        }
      }`,
      variables: {
        email,
      },
    });

    return data.data.data.users[0];
  } catch (err) {
    console.log(err);
  }
};

export default function Nav() {
  const theme = useTheme();
  const { dispatch, state } = useUser();

  const [session, loading] = useSession();
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    if (session) {
      const setUser = async () => {
        const user = await getUser(session.user.email);
        dispatch({ type: 'update', user });
      };

      setUser();
    }
  }, [session]);

  const handleOpenPopover = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  return (
    <nav>
      <Box className={styles.root}>
        <Box className={styles.leftBox}>
          <Box className={styles.leftBox__topBox}>
            <Box className={styles.logoBox}>
              <Link href="/">
                <a className={styles.logoAnchor}>
                  <Image
                    src="/open_algo.png"
                    alt="Open Algo"
                    width={80}
                    height={80}
                  />
                </a>
              </Link>
            </Box>
            <Box
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                marginLeft: 10,
              }}
            >
              <Box className={styles.linksBox}>
                <Box className={styles.linkBox}>
                  <Link href="/">
                    <a className={styles.linkAnchor}>
                      <Typography
                        variant="h5"
                        className={styles.title}
                        style={{
                          fontWeight: 'bold',
                          color: theme.palette.primary.main,
                        }}
                      >
                        Open Algo
                      </Typography>
                    </a>
                  </Link>
                </Box>
                <Box className={styles.linkBox}>
                  <Link href="/problems">
                    <a className={styles.linkAnchor}>
                      <Typography className={styles.linkText}>
                        Problems
                      </Typography>
                    </a>
                  </Link>
                </Box>

                <Box className={styles.linkBox}>
                  <Link href="/learn">
                    <a className={styles.linkAnchor}>
                      <Typography className={styles.linkText}>Learn</Typography>
                    </a>
                  </Link>
                </Box>

                <Box className={styles.linkBox}>
                  <Link href="/patterns">
                    <a className={styles.linkAnchor}>
                      <Typography className={styles.linkText}>
                        Patterns
                      </Typography>
                    </a>
                  </Link>
                </Box>
              </Box>
              <Box className={styles.leftBox__bottomBox}>
                <Typography
                  variant="caption"
                  style={{
                    color: theme.palette.secondary.light,
                    fontStyle: 'italic',
                  }}
                >
                  DSA First Principles. As simple as possible. Free forever!
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box className={styles.rightBox}>
          <Button className={styles.actionButton}>
            <FontAwesomeIcon
              icon={faBell}
              size="lg"
              className={styles.actionIcon}
            />
          </Button>

          <Button className={styles.actionButton} onClick={handleOpenPopover}>
            {session ? (
              <Image
                src={session.user.image}
                width={30}
                height={30}
                alt="user_avatar"
                className={styles.userAvatar}
              />
            ) : (
              <FontAwesomeIcon
                icon={faUserCircle}
                size="lg"
                className={styles.actionIcon}
              />
            )}
          </Button>

          <Popover
            open={Boolean(anchorEl)}
            onClose={handleClosePopover}
            anchorEl={anchorEl}
          >
            <Box style={{ backgroundColor: theme.palette.info.main }}>
              {session ? (
                <Button onClick={() => signOut()}>Sign Out</Button>
              ) : (
                <Button onClick={() => signIn()}>Sign In</Button>
              )}
            </Box>
          </Popover>
        </Box>
      </Box>
    </nav>
  );
}
