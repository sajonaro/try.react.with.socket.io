import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import InputForm from "./InputForm";

export default class RequestsQueue extends React.Component {
  render() {
    return (
      <TableContainer component={Paper}>
        <Table style={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Legal Name</TableCell>
              <TableCell align="center">AVID </TableCell>
              <TableCell align="center">Country</TableCell>
              <TableCell align="center">Address</TableCell>
              <TableCell align="center">GLEIF</TableCell>
              <TableCell align="center">Last Updated</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.queue.map(row => (
              <TableRow key={row.key}>
                <TableCell align="left">{row.legalName}</TableCell>
                <TableCell component="th" scope="row">
                  <InputForm
                    attributeId="AVID"
                    text={row.AVID}
                    editEntity={(arrtId, newVale) =>
                      this.props.editEntity(row.key, arrtId, newVale)
                    }
                  />
                </TableCell>
                <TableCell align="right">
                  <InputForm
                    attributeId="country"
                    text={row.country}
                    editEntity={(arrtId, newVale) =>
                      this.props.editEntity(row.key, arrtId, newVale)
                    }
                  />
                </TableCell>
                <TableCell align="right">
                  <InputForm
                    attributeId="address"
                    text={row.address}
                    editEntity={(arrtId, newVale) =>
                      this.props.editEntity(row.key, arrtId, newVale)
                    }
                  ></InputForm>
                </TableCell>
                <TableCell align="right">
                  <InputForm
                    attributeId="GLEIF"
                    text={row.GLEIF}
                    editEntity={(arrtId, newVale) =>
                      this.props.editEntity(row.key, arrtId, newVale)
                    }
                  />
                </TableCell>
                <TableCell align="right">{row.modifiedDate}</TableCell>
                <TableCell align="right">
                  <button
                    onClick={() => this.props.handleSubmitEntity(row.key)}
                  >
                    apply changes
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}
