/** @format */

import TransactionService from "../service/TransactionService";

class TransactionController {
  async getTransactionBySeller(req, res) {
    {
      try {
        const seller = req.seller;
        if (!seller) {
          return res.status(401).json({ error: "Unauthorized" });
        }
        const transactions = await TransactionService.getTransactionBySellerId(
          seller._id,
        );
        return res.status(200).json(transactions);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    }
  }
}

export default new TransactionController();
