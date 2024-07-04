import React, { useEffect, useState } from "react";
import {
  Table,
  Header,
  Body,
  HeaderRow,
  HeaderCell,
  Row,
  Cell,
} from "@table-library/react-table-library/table";
import { useTheme } from "@table-library/react-table-library/theme";
import { useSort } from "@table-library/react-table-library/sort";
import { Box, Button, Input, Text } from "@chakra-ui/react";

const HarTable = ({
  url = "https://scanindex.blob.core.windows.net/synthetic-scan-har-files/ASDA Home-2024-07-03T14:30:00.030Z-browser-network.har",
}: {
  url?: string;
}) => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchHarData = async () => {
      try {
        const response = await fetch(url);
        const harJson = await response.json();
        setData(harJson.log.entries);
      } catch (error) {
        console.error("Error fetching HAR data:", error);
      }
    };

    fetchHarData();
  }, [url]);

  const nodes = data;

  const theme = useTheme({
    Table: `
      --data-table-library_grid-template-columns: 150px 150px repeat(9, minmax(100px, 1fr));
    `,
    BaseCell: `
      height: 24px;
      padding: 4px;
      font-size: 12px;
    `,
  });

  const sort = useSort(
    { nodes },
    {
      onChange: () => {},
    },
    {
      sortFns: {
        NAME: (array) =>
          array.sort((a, b) => a.request.url.localeCompare(b.request.url)),
        URL: (array) =>
          array.sort((a, b) => a.request.url.localeCompare(b.request.url)),
        METHOD: (array) =>
          array.sort((a, b) =>
            a.request.method.localeCompare(b.request.method)
          ),
        STATUS: (array) =>
          array.sort((a, b) => a.response.status - b.response.status),
        PROTOCOL: (array) =>
          array.sort((a, b) =>
            a.response.httpVersion.localeCompare(b.response.httpVersion)
          ),
        SCHEME: (array) =>
          array.sort((a, b) =>
            new URL(a.request.url).protocol.localeCompare(
              new URL(b.request.url).protocol
            )
          ),
        TYPE: (array) =>
          array.sort((a, b) =>
            a.response.content.mimeType.localeCompare(
              b.response.content.mimeType
            )
          ),
        INITIATOR: (array) =>
          array.sort((a, b) =>
            a.serverIPAddress.localeCompare(b.serverIPAddress)
          ),
        SIZE: (array) =>
          array.sort((a, b) => a.response.bodySize - b.response.bodySize),
        TIME: (array) => array.sort((a, b) => a.time - b.time),
      },
    }
  );

  return (
    <Box>
      <Box mb={4}>
        <Button
          onClick={() => {
            // Reset column order or other actions
          }}
        >
          Reset Column Order
        </Button>
        <Input
          placeholder="Global Search"
          onChange={(e) => {
            // Implement global filter logic
          }}
        />
      </Box>
      <Table data={{ nodes }} theme={theme} sort={sort}>
        <Header>
          <HeaderRow>
            <HeaderCell sortKey="NAME">
              Name
            </HeaderCell>
            <HeaderCell sortKey="URL">
              URL
            </HeaderCell>
            <HeaderCell sortKey="METHOD">
              Method
            </HeaderCell>
            <HeaderCell sortKey="STATUS">
              Status
            </HeaderCell>
            <HeaderCell sortKey="PROTOCOL">
              Protocol
            </HeaderCell>
            <HeaderCell sortKey="SCHEME">
              Scheme
            </HeaderCell>
            <HeaderCell sortKey="TYPE">
              Type
            </HeaderCell>
            <HeaderCell sortKey="INITIATOR">
              Initiator
            </HeaderCell>
            <HeaderCell sortKey="SIZE">
              Size
            </HeaderCell>
            <HeaderCell sortKey="TIME">
              Time
            </HeaderCell>
            <HeaderCell>Waterfall</HeaderCell>
          </HeaderRow>
        </Header>
        <Body>
          {nodes.map((item: any) => (
            <Row
              key={item.request.url}
              item={{
                id: item.request.url,
                nodes: undefined,
              }}
            >
              <Cell>
                <Text fontSize="xs">{item.request.url}</Text>
              </Cell>
              <Cell>
                <Text fontSize="xs">{item.request.url}</Text>
              </Cell>
              <Cell>
                <Text fontSize="xs">{item.request.method}</Text>
              </Cell>
              <Cell>
                <Text fontSize="xs">{item.response.status}</Text>
              </Cell>
              <Cell>
                <Text fontSize="xs">{item.response.httpVersion}</Text>
              </Cell>
              <Cell>
                <Text fontSize="xs">
                  {new URL(item.request.url).protocol.replace(":", "")}
                </Text>
              </Cell>
              <Cell>
                <Text fontSize="xs">{item.response.content.mimeType}</Text>
              </Cell>
              <Cell>
                <Text fontSize="xs">{item.serverIPAddress}</Text>
              </Cell>
              <Cell>
                <Text fontSize="xs">
                  {(item.response.bodySize / 1024).toFixed(2)} KB
                </Text>
              </Cell>
              <Cell>
                <Text fontSize="xs">{item.time} ms</Text>
              </Cell>
              <Cell>
                <Box
                  height="4px"
                  width={`${item.time / 10}%`}
                  backgroundColor="teal"
                />
              </Cell>
            </Row>
          ))}
        </Body>
      </Table>
    </Box>
  );
};

export default HarTable;
