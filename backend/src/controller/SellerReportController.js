/** @format */

import SellerReportService from "../service/SellerReportService";

class SellerReportController {
  async getSellerReport(req, res) {
    try {
      const seller = req.seller;
      if (!seller) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      const report = await SellerReportService.getSellerReport(seller._id);
      return res.status(200).json(report);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export default new SellerReportController();
