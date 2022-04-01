import { Title } from "@mantine/core";
import { Avatar, Box, Chip, Divider, Stack, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { useLocation, useMatch } from "react-router-dom";
import FormCreate from "../../components/FormCreate";
import useGet from "../../hooks/useGet";
import { columns } from "./data";
import Loader from "../../components/Loader";
import resolveImage from "../../util/resolveImage";
const Sport = () => {
  const match = useMatch("/sports/:id");
  const GetOwner = useGet(`/api/game/${match.params.id}`);
  let content = <Loader />;
  if (!GetOwner.loading && !GetOwner.error && GetOwner.data) {
    content = (
      <Box margin={2}>
        <Box>
          <h2 style={{ letterSpacing: 1.2 }}>الميديرين</h2>
          <Box height={52 * 7 + 58}>
            <DataGrid
              disableSelectionOnClick
              disableVirtualization
              showCellRightBorder={false}
              loading={false}
              sx={{ bgcolor: "#222" }}
              rows={GetOwner.data.GameModerators}
              columns={columns}
              pageSize={6}
              rowsPerPageOptions={[6]}
            />
          </Box>
        </Box>
        <Divider variant="fullWidth" />
        {GetOwner.data.type === "multi" && <h1>الفرق</h1>}
        {GetOwner.data.type === "single" && (
          <Box>
            <h2>اللاعبين</h2>
            <Box height={52 * 7 + 58}>
              <DataGrid
                disableSelectionOnClick
                disableVirtualization
                showCellRightBorder={false}
                loading={false}
                sx={{ bgcolor: "#222" }}
                rows={GetOwner.data.GamePlayers}
                columns={columns}
                pageSize={6}
                rowsPerPageOptions={[6]}
              />
            </Box>
          </Box>
        )}

        {GetOwner.data.type === "multi" &&
          GetOwner.data.GameTeams.map((team) => (
            <Box>
              <h2>{team.name}</h2>
              <Box height={52 * 7 + 58}>
                <DataGrid
                  disableSelectionOnClick
                  disableVirtualization
                  showCellRightBorder={false}
                  loading={false}
                  sx={{ bgcolor: "#222" }}
                  rows={GetOwner.data.GamePlayers.filter(
                    (player) => player.teamId === team.id
                  )}
                  columns={columns}
                  pageSize={6}
                  rowsPerPageOptions={[6]}
                />
              </Box>
            </Box>
          ))}
      </Box>
    );
  }
  return content;
};

export default Sport;
