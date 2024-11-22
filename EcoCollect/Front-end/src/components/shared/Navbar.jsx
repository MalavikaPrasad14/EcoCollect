import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Button, Tooltip, MenuItem, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const pages = [
  { name: 'Home', path: '/home' },
  { name: 'My Bookings', path: '/mybookings' },
  { name: 'Price Sheet', path: '/pricesheet' },
  { name: 'Gallery', scrollTarget: 'galleryRef' },
  { name: 'About Us', scrollTarget: 'aboutUsRef' }
];

const settings = [
  { name: 'Profile', path: '/profile' },
  { name: 'Feedback', path: '/feedback' },
  { name: 'Sign Out', path: '/' }
];

function ResponsiveAppBar({ scrollToSection, galleryRef, aboutUsRef }) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleNavigation = (page) => {
    handleCloseNavMenu();
    if (page.scrollTarget) {
      // Call scrollToSection if page has a scrollTarget (for in-page sections)
      scrollToSection(page.scrollTarget === 'galleryRef' ? galleryRef : aboutUsRef);
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#012212e2' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
            <img src='/images/EcoCollect Logo.png' alt="EcoCollect Logo" style={{ width: 95, height: 90 }} />
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            EcoCollect
          </Typography>

          {/* Mobile Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="open navigation menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={() => handleNavigation(page)}>
                  {page.path ? (
                    <Typography textAlign="center">
                      <Link to={page.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                        {page.name}
                      </Link>
                    </Typography>
                  ) : (
                    <Typography textAlign="center">{page.name}</Typography>
                  )}
                </MenuItem>
              ))}
            </Menu>
          </Box>

{/* Logo - Mobile View */}
<Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}>
            <img
              src='/images/EcoCollect Logo.png'
              alt="EcoCollect Logo"
              style={{ width: 90, height: 90 }}
            />
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            EcoCollect
          </Typography>

          {/* Desktop Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                sx={{ my: 2, color: 'white', display: 'block' }}
                onClick={() => handleNavigation(page)}
                component={page.path ? Link : 'button'}
                to={page.path || undefined}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          {/* User Avatar and Settings */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">
                    <Link to={setting.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                      {setting.name}
                    </Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
