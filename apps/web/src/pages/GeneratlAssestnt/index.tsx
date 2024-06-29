import React, { useState, lazy, Suspense } from "react";
import { Box, Button, Input, VStack, HStack, Text } from "@chakra-ui/react";
import { useEffect } from "react";

const components = ["CXTasksTable", 'DeleveryFlowTIme','DeleveryFlowDistrubution','CXCompleationRate'];

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const getRandomComponent = () => {
    const randomComponent = components[Math.floor(Math.random() * components.length)];
    return lazy(() => import(`../../charts/${randomComponent}/index`));
  };

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { from: "user", text: input }]);
      const DynamicComponent = getRandomComponent();
      setMessages((prevMessages) => [
        ...prevMessages,
        { from: "bot", Component: DynamicComponent }
      ]);
      setInput("");
    }
  };
  useEffect(()=>{
    document.title='General Assestent | Insight Track';
  },[]);

  return (
    <Box display="flex" flexDirection="column" height="calc(100vh - 50px)" bg="gray.50">
      <Box flex="1" overflowY="auto" p={4}>
        <VStack spacing={4} align="stretch">
          {messages.map((message, index) => (
            <HStack
              key={index}
              alignSelf={message.from === "user" ? "flex-end" : "flex-start"}
            >
              {message.Component ? (
                <Suspense fallback={<div>Loading...</div>}>
                  <message.Component />
                </Suspense>
              ) : (
                <Text
                  bg={message.from === "user" ? "blue.500" : "gray.300"}
                  color="white"
                  px={4}
                  py={2}
                  borderRadius="md"
                >
                  {message.text}
                </Text>
              )}
            </HStack>
          ))}
        </VStack>
      </Box>
      <HStack p={4} borderTop="1px solid" borderColor="gray.200">
        <Input
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button colorScheme="blue" onClick={handleSend}>
          Send
        </Button>
      </HStack>
    </Box>
  );
};

export default ChatPage;
