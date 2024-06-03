import React, { useState } from 'react';
import { ChakraProvider, Box, Flex, FormControl, FormLabel, Input, Select, Button, VStack, Textarea } from '@chakra-ui/react';

const SyntheticHealthCheckForm = () => {
  const [formData, setFormData] = useState({
    url: '',
    frequency: '5m',
    method: 'GET',
    headers: '',
    expectedStatus: '',
    body: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Health Check Configuration:', formData);
    // You can add your form submission logic here
  };

  return (
    <Box p={6} bg="white" borderRadius="md" boxShadow="md">
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl id="url" isRequired>
            <FormLabel>URL</FormLabel>
            <Input
              name="url"
              type="url"
              placeholder="https://example.com"
              value={formData.url}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl id="frequency" isRequired>
            <FormLabel>Frequency</FormLabel>
            <Select name="frequency" value={formData.frequency} onChange={handleInputChange}>
              <option value="1m">1 minute</option>
              <option value="5m">5 minutes</option>
              <option value="10m">10 minutes</option>
              <option value="30m">30 minutes</option>
              <option value="1h">1 hour</option>
              <option value="6h">6 hours</option>
              <option value="12h">12 hours</option>
              <option value="24h">24 hours</option>
            </Select>
          </FormControl>

          <FormControl id="method" isRequired>
            <FormLabel>Request Method</FormLabel>
            <Select name="method" value={formData.method} onChange={handleInputChange}>
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
              <option value="HEAD">HEAD</option>
            </Select>
          </FormControl>

          <FormControl id="headers">
            <FormLabel>Headers</FormLabel>
            <Textarea
              name="headers"
              placeholder='{"Content-Type": "application/json"}'
              value={formData.headers}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl id="expectedStatus" isRequired>
            <FormLabel>Expected Response Status</FormLabel>
            <Input
              name="expectedStatus"
              type="number"
              placeholder="200"
              value={formData.expectedStatus}
              onChange={handleInputChange}
            />
          </FormControl>

          {formData.method === 'POST' || formData.method === 'PUT' ? (
            <FormControl id="body">
              <FormLabel>Request Body</FormLabel>
              <Textarea
                name="body"
                placeholder='{"key": "value"}'
                value={formData.body}
                onChange={handleInputChange}
              />
            </FormControl>
          ) : null}

          <Button type="submit" colorScheme="blue" width="full">
            Save Configuration
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default SyntheticHealthCheckForm;
