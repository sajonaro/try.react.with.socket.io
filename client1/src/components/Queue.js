import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import InputForm from "./InputForm";

export default class Queue extends React.Component {
  render() {
    return (
      <TableContainer component={Paper}>
        <Table style={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Client Data</TableCell>
              <TableCell align="center">Entity Legal Name</TableCell>
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
                <TableCell align="left">
                  <InputForm
                    text={row.clientData}
                    editEntity={newVal =>
                      this.props.onEntityChanged(row.key, "clientData", newVal)
                    }
                  />
                </TableCell>
                <TableCell align="left">
                  <InputForm
                    text={row.legalName}
                    editEntity={newVal =>
                      this.props.onEntityChanged(row.key, "legalName", newVal)
                    }
                  />
                </TableCell>
                <TableCell align="right">
                  <InputForm
                    text={row.AVID}
                    editEntity={newVal =>
                      this.props.onEntityChanged(row.key, "AVID", newVal)
                    }
                  />
                </TableCell>
                <TableCell align="right">
                  <InputForm
                    text={row.country}
                    editEntity={newVal =>
                      this.props.onEntityChanged(row.key, "country", newVal)
                    }
                  />
                </TableCell>
                <TableCell align="right">
                  <InputForm
                    text={row.address}
                    editEntity={newVal =>
                      this.props.onEntityChanged(row.key, "address", newVal)
                    }
                  ></InputForm>
                </TableCell>
                <TableCell align="right">
                  <InputForm
                    text={row.GLEIF}
                    editEntity={newVal =>
                      this.props.onEntityChanged(row.key, "GLEIF", newVal)
                    }
                  />
                </TableCell>
                <TableCell align="right">
                  <InputForm
                    text={row.modifiedDate}
                    editEntity={newVal =>
                      this.props.onEntityChanged(
                        row.key,
                        "modifiedDate",
                        newVal
                      )
                    }
                  />
                </TableCell>
                <TableCell align="right">
                  <button
                    onClick={this.props.handleSubmitEntity.bind(this, row.key)}
                  >
                    update (curate)
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
