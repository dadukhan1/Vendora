/** @format */

import { SellerReport } from "../models/SellerReport.js";

class SellerReportService {
  async getSellerReport(sellerId) {
    try {
      const report = await SellerReport.findOne({ seller: sellerId });
      if (!report) {
        return {
          totalEarnings: 0,
          totalOrders: 0,
          totalSales: 0,
          message: "No reports found!",
        };
      }
      return report;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateSellerReport(sellerReport) {
    try {
      return await SellerReport.findByIdAndUpdate(
        sellerReport._id,
        sellerReport,
        { new: true },
      );
    } catch (error) {
      throw new Error(`Error updating seller report: ${error.message}`);
    }
  }
}

export default new SellerReportService();
