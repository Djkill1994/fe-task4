import React, { ChangeEvent, FC, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Checkbox,
} from "@mui/material";
import { Block, CheckCircleOutline } from "@mui/icons-material";
import { UsersTableHeader } from "./UsersTableHeader";
import { UsersTableToolbar } from "./UsersTableToolbar";

function createData(
  id: string,
  name: string,
  email: string,
  registrationDate: string,
  lastVisit: string,
  status: boolean
) {
  return {
    id,
    name,
    email,
    registrationDate,
    lastVisit,
    status,
  };
}

const rows = [
  createData("iw", "Nome", "sdkhfb@jjd.ee", "21.12.2022", "4.7.2023", false),
  createData("23", "Fsd", "sdkhfb@jjd.ee", "21.12.2022", "4.7.2023", false),
  createData("dfg", "Dggrg", "sdkhfb@jjd.ee", "21.12.2022", "4.7.2023", false),
  createData("4234", "Fsrgs", "sdkhfb@jjd.ee", "21.12.2022", "4.7.2023", true),
  createData("g4", "Ggwg", "sdkhfb@jjd.ee", "21.12.2022", "4.7.2023", false),
  createData("fgv3", "GBbwe", "sdkhfb@jjd.ee", "21.12.2022", "4.7.2023", false),
];

export const UsersTable: FC = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
    } else {
      setSelected([]);
    }
  };

  const handleClick = (event: React.MouseEvent, name: string): void => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  return (
    <Paper sx={{ width: "100%", mb: 2 }}>
      <UsersTableToolbar numSelected={selected.length} />
      <TableContainer>
        <Table aria-labelledby="tableTitle">
          <UsersTableHeader
            numSelected={selected.length}
            onSelectAllClick={handleSelectAllClick}
            rowCount={rows.length}
          />
          <TableBody>
            {rows.map((row, index) => {
              const isItemSelected = selected.indexOf(row.name) !== -1;
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  onClick={(event) => handleClick(event, row.name)}
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.id}
                  selected={isItemSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isItemSelected}
                      inputProps={{
                        "aria-labelledby": labelId,
                      }}
                    />
                  </TableCell>
                  <TableCell id={labelId} scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.registrationDate}</TableCell>
                  <TableCell>{row.lastVisit}</TableCell>
                  <TableCell>
                    {row.status ? <Block /> : <CheckCircleOutline />}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
