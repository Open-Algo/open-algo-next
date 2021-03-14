import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/client';
import { Box, Button, Typography } from '@material-ui/core';
import { faBell, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../../styles/Nav.module.scss';

export default function Nav() {
  const [session, loading] = useSession();

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
                  width={60}
                  height={60}
                />
                <Typography variant="h6" className={styles.title}>
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
              size="2x"
              className={styles.actionIcon}
            />
          </Button>

          <Button className={styles.actionButton}>
            {session ? (
              <Image
                src={session.user.image}
                width={40}
                height={40}
                alt="user_avatar"
                className={styles.userAvatar}
              />
            ) : (
              <FontAwesomeIcon
                icon={faUserCircle}
                size="2x"
                className={styles.actionIcon}
              />
            )}
          </Button>
        </Box>
      </Box>
    </nav>
  );
}
