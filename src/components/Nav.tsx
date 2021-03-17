import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession, signIn, signOut } from 'next-auth/client';
import { Box, Button, Popover, Typography } from '@material-ui/core';
import { faBell, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../../styles/Nav.module.scss';

export default function Nav() {
  const [session, loading] = useSession();
  const [anchorEl, setAnchorEl] = useState(null);

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
          <Box className={styles.logoBox}>
            <Link href="/">
              <a className={styles.logoAnchor}>
                <Image
                  src="/open_algo.png"
                  alt="Open Algo"
                  width={80}
                  height={80}
                />
                <Typography
                  variant="h6"
                  className={styles.title}
                  style={{ fontWeight: 'bold', color: '#1B91DA' }}
                >
                  Open Algo
                </Typography>
              </a>
            </Link>
          </Box>

          <Box className={styles.linksBox}>
            <Box className={styles.linkBox}>
              <Link href="/problems">
                <a className={styles.linkAnchor}>
                  <Typography className={styles.linkText}>Problems</Typography>
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
                  <Typography className={styles.linkText}>Patterns</Typography>
                </a>
              </Link>
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
            <Typography>Hey</Typography>
            {session ? (
              <Button onClick={() => signOut()}>Sign Out</Button>
            ) : (
              <Button onClick={() => signIn()}>Sign In</Button>
            )}
          </Popover>
        </Box>
      </Box>
    </nav>
  );
}
