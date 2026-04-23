/** @format */

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { useNavigate } from "react-router";

interface CategoryItem {
  _id: string;
  image: string;
  categoryId: string;
}

interface Props {
  cateogry?: CategoryItem[]; // optional rakha for safety
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function HomeCategoryTable({ cateogry = [] }: Props) {
  const navigate = useNavigate();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }}>
        <TableHead>
          <TableRow>
            <StyledTableCell>No.</StyledTableCell>
            <StyledTableCell>Id</StyledTableCell>
            <StyledTableCell>Image</StyledTableCell>
            <StyledTableCell align='right'>Category</StyledTableCell>
            <StyledTableCell align='right'>Update</StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {cateogry.map((item, index) => (
            <StyledTableRow key={item._id}>
              <StyledTableCell>{index + 1}</StyledTableCell>

              <StyledTableCell>{item._id}</StyledTableCell>

              <StyledTableCell>
                <img className='w-20 rounded-md' src={item.image} alt='' />
              </StyledTableCell>

              <StyledTableCell align='right'>{item.categoryId}</StyledTableCell>

              <StyledTableCell align='right'>
                <IconButton
                  color='warning'
                  onClick={() =>
                    navigate(`/admin/home-page/update/${item._id}`)
                  }
                >
                  <Edit />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
