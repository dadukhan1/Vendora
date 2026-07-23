/** @format */

import { useState } from "react";
import DealTable from "./DealTable";
import CreateDealForm from "./CreateDealForm";
import { Box, Typography, Tabs, Tab, Paper } from "@mui/material";

const Deal = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (_: any, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ p: { xs: 0, md: 2 } }}>
      <Box sx={{ mb: 4 }}>
        <p className="label-overline text-[#c9993a] mb-1">Promotions</p>
        <Typography variant="h4" sx={{ fontWeight: 800, color: "#0a0a0a", fontFamily: "Playfair Display", mb: 1 }}>
          Deal Management
        </Typography>
        <Typography variant="body2" sx={{ color: "#9ca3af", fontFamily: "Outfit" }}>
          Manage category-wide discounts and promotional deals.
        </Typography>
      </Box>

      <Paper elevation={0} sx={{ border: "1px solid #f0ece6", borderRadius: "24px", overflow: "hidden", bgcolor: "#fff" }}>
        <Box sx={{ borderBottom: 1, borderColor: "#f0ece6", px: 3, pt: 2, bgcolor: "#fff" }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            sx={{
              "& .MuiTabs-indicator": { height: 2, bgcolor: "#c9993a", borderRadius: "2px" },
              "& .MuiTab-root": {
                fontWeight: 700,
                fontFamily: "Outfit",
                textTransform: "none",
                fontSize: "13px",
                minWidth: 160,
                color: "#9ca3af",
                "&.Mui-selected": { color: "#0a0a0a" }
              }
            }}
          >
            <Tab label="Active Deals" />
            <Tab label="Create Deal" />
          </Tabs>
        </Box>

        <Box sx={{ p: activeTab === 0 ? 0 : 3, bgcolor: "#fff" }}>
          {activeTab === 0 ? (
            <DealTable />
          ) : (
            <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
              <CreateDealForm onSuccess={() => setActiveTab(0)} />
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default Deal;
