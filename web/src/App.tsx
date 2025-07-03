import React from "react";
import { Box, CssBaseline, AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Button } from "@mui/material";
import { CloudUpload, Straighten, ColorLens, TableChart, PictureAsPdf, Image, InsertDriveFile, Settings } from "@mui/icons-material";

// Placeholder components for future implementation
const BlueprintViewer = () => <Box sx={{ flex: 1, bgcolor: '#f5f5f5', minHeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Blueprint Viewer (PDF/Image/CAD)</Box>;
const CalibrationBar = () => <Box sx={{ p: 2, bgcolor: '#e3f2fd', display: 'flex', alignItems: 'center', gap: 2 }}><Straighten /> Calibration Bar (Set Scale)</Box>;
const MaterialSidebar = () => (
  <Drawer variant="permanent" anchor="left" sx={{ width: 260, flexShrink: 0, [`& .MuiDrawer-paper`]: { width: 260, boxSizing: 'border-box' } }}>
    <Toolbar />
    <Box sx={{ overflow: 'auto' }}>
      <List>
        <ListItem><ListItemIcon><ColorLens /></ListItemIcon><ListItemText primary="Material Selection" /></ListItem>
        <Divider />
        <ListItem button><ListItemIcon><ColorLens sx={{ color: 'blue' }} /></ListItemIcon><ListItemText primary="Domestic Cold Water" /></ListItem>
        <ListItem button><ListItemIcon><ColorLens sx={{ color: 'red' }} /></ListItemIcon><ListItemText primary="Domestic Hot Water" /></ListItem>
        <ListItem button><ListItemIcon><ColorLens sx={{ color: 'green' }} /></ListItemIcon><ListItemText primary="Chilled Water" /></ListItem>
        <ListItem button><ListItemIcon><ColorLens sx={{ color: 'orange' }} /></ListItemIcon><ListItemText primary="Heating Water" /></ListItem>
        <ListItem button><ListItemIcon><ColorLens sx={{ color: 'purple' }} /></ListItemIcon><ListItemText primary="Condensate" /></ListItem>
        <ListItem button><ListItemIcon><ColorLens sx={{ color: 'brown' }} /></ListItemIcon><ListItemText primary="Refrigerant Line" /></ListItem>
        <ListItem button><ListItemIcon><ColorLens sx={{ color: 'gray' }} /></ListItemIcon><ListItemText primary="Supply Air Duct" /></ListItem>
        <ListItem button><ListItemIcon><ColorLens sx={{ color: 'teal' }} /></ListItemIcon><ListItemText primary="Return Air" /></ListItem>
      </List>
    </Box>
  </Drawer>
);

const TopBar = () => (
  <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
    <Toolbar>
      <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
        Digital Blueprint Material Takeoff Tool
      </Typography>
      <Button color="inherit" startIcon={<CloudUpload />}>Upload Blueprint</Button>
      <Button color="inherit" startIcon={<InsertDriveFile />}>Open</Button>
      <Button color="inherit" startIcon={<Settings />}>Settings</Button>
    </Toolbar>
  </AppBar>
);

const TakeoffTable = () => <Box sx={{ p: 2, bgcolor: '#fff', minHeight: 200 }}>Takeoff Table (Live Totals)</Box>;

function App() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <TopBar />
      <MaterialSidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, ml: '260px', mt: '64px', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <CalibrationBar />
        <BlueprintViewer />
        <TakeoffTable />
      </Box>
    </Box>
  );
}

export default App; 