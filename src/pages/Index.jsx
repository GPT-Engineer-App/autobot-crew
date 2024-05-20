import React, { useState, useEffect } from "react";
import { Container, Text, VStack, Box, Button, Switch, Textarea, HStack, Progress, IconButton, useToast, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Input, Select } from "@chakra-ui/react";
import { FaPowerOff, FaPlay, FaPause, FaStop, FaSave, FaFolderOpen, FaCog, FaKey, FaRobot, FaCode, FaSearch, FaImage, FaVideo, FaBusinessTime, FaDollarSign, FaAd, FaTools, FaTerminal } from "react-icons/fa";

const agents = [
  { name: "Master Agent", icon: FaRobot },
  { name: "Project Manager", icon: FaBusinessTime },
  { name: "Coding Agent", icon: FaCode },
  { name: "Internet Research Agent", icon: FaSearch },
  { name: "Social Media Agent", icon: FaAd },
  { name: "Photo & Art Agent", icon: FaImage },
  { name: "Business Executive Agent", icon: FaDollarSign },
  { name: "Financial Executive Agent", icon: FaDollarSign },
  { name: "Videography Agent", icon: FaVideo },
  { name: "Mixture of Experts", icon: FaTools },
  { name: "Testing Agent", icon: FaTools },
  { name: "Advertising Agent", icon: FaAd },
];

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [initialRequest, setInitialRequest] = useState("");
  const [isRequestMode, setIsRequestMode] = useState(true);
  const [agentStatus, setAgentStatus] = useState(agents.map((agent) => ({ ...agent, status: "Idle", isActive: true })));
  const [continuous, setContinuous] = useState(false);
  const [output, setOutput] = useState("");
  const [agentResponses, setAgentResponses] = useState("");
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 10 : 100));
      if (progress === 100) setLoading(false);
    }, 500);
    return () => clearInterval(interval);
  }, [progress]);

  const handleSendRequest = () => {
    if (isRequestMode) {
      toast({
        title: "Warning",
        description: "Do not enter any further text into this window. Use the update injector instead.",
        status: "warning",
        duration: 10000,
        isClosable: true,
      });
    }
    // Simulate sending request to CrewAI
    setOutput((prev) => prev + `\n${initialRequest}`);
    setAgentResponses((prev) => prev + `\nAgent Response to: ${initialRequest}`);
    setInitialRequest("");
  };

  const handleToggleAgent = (index) => {
    setAgentStatus((prev) => {
      const newStatus = [...prev];
      newStatus[index].isActive = !newStatus[index].isActive;
      return newStatus;
    });
  };

  return (
    <Container centerContent maxW="container.xl" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center" bg="black" color="cyan">
      {loading ? (
        <VStack spacing={4}>
          <Text fontSize="4xl" fontFamily="Consolas">
            AutoCrew
          </Text>
          <Text fontSize="md" fontFamily="Consolas">
            Written & Created by Psychophoria
          </Text>
          <Progress value={progress} size="lg" colorScheme="cyan" width="100%" />
        </VStack>
      ) : (
        <VStack spacing={4} width="100%">
          <Text fontSize="4xl" fontFamily="Consolas">
            AutoCrew
          </Text>
          <HStack spacing={4} width="100%">
            <VStack spacing={4} width="20%">
              {agentStatus.map((agent, index) => (
                <HStack key={agent.name} spacing={2}>
                  <IconButton aria-label={agent.name} icon={<agent.icon />} size="lg" />
                  <Text fontSize="md" fontFamily="Consolas">
                    {agent.name}
                  </Text>
                  <Switch isChecked={agent.isActive} onChange={() => handleToggleAgent(index)} />
                  <Text fontSize="sm" fontFamily="Consolas">
                    {agent.status}
                  </Text>
                </HStack>
              ))}
            </VStack>
            <VStack spacing={4} width="60%">
              <HStack spacing={2}>
                <Text fontSize="md" fontFamily="Consolas">
                  {isRequestMode ? "REQUEST" : "UPDATE INJECTOR"}
                </Text>
                <Switch isChecked={isRequestMode} onChange={() => setIsRequestMode(!isRequestMode)} />
              </HStack>
              <Textarea value={initialRequest} onChange={(e) => setInitialRequest(e.target.value)} placeholder={isRequestMode ? "Enter your initial request..." : "Enter your update..."} />
              <Button onClick={handleSendRequest} colorScheme="cyan" size="lg">
                Send
              </Button>
              <HStack spacing={4} width="100%">
                <Box width="50%" border="1px" borderColor="cyan" padding="4">
                  <Text fontSize="md" fontFamily="Consolas">
                    Full Output
                  </Text>
                  <Textarea value={output} readOnly height="200px" />
                </Box>
                <Box width="50%" border="1px" borderColor="cyan" padding="4">
                  <Text fontSize="md" fontFamily="Consolas">
                    Agent Responses
                  </Text>
                  <Textarea value={agentResponses} readOnly height="200px" />
                </Box>
              </HStack>
            </VStack>
            <VStack spacing={4} width="20%">
              <Button leftIcon={<FaPowerOff />} colorScheme="red" size="lg">
                Kill Switch
              </Button>
              <Button leftIcon={<FaPlay />} colorScheme="green" size="lg">
                Start
              </Button>
              <Button leftIcon={<FaPause />} colorScheme="yellow" size="lg">
                Pause
              </Button>
              <Button leftIcon={<FaStop />} colorScheme="red" size="lg">
                Stop
              </Button>
              <Button leftIcon={<FaSave />} colorScheme="blue" size="lg">
                Save/Export
              </Button>
              <Button leftIcon={<FaFolderOpen />} colorScheme="blue" size="lg">
                Open Workspace
              </Button>
              <Button leftIcon={<FaCog />} colorScheme="blue" size="lg" onClick={onOpen}>
                Settings
              </Button>
              <Switch isChecked={continuous} onChange={() => setContinuous(!continuous)} colorScheme="cyan">
                Continuous
              </Switch>
              <Progress value={progress} size="lg" colorScheme="cyan" width="100%" />
              <Text fontSize="sm" fontFamily="Consolas">
                Estimated Completion: {progress}%
              </Text>
            </VStack>
          </HStack>
        </VStack>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <HStack spacing={2}>
                <Text fontSize="md" fontFamily="Consolas">
                  LLM System
                </Text>
                <Select placeholder="Select LLM System">
                  <option value="ollama">Ollama</option>
                  <option value="google">Google/Gemini</option>
                  <option value="groq">Groq</option>
                </Select>
              </HStack>
              <HStack spacing={2}>
                <Text fontSize="md" fontFamily="Consolas">
                  Ollama Model
                </Text>
                <Select placeholder="Select Ollama Model">
                  <option value="model1">Model 1</option>
                  <option value="model2">Model 2</option>
                </Select>
              </HStack>
              <HStack spacing={2}>
                <Text fontSize="md" fontFamily="Consolas">
                  API Keys
                </Text>
                <Button leftIcon={<FaKey />} colorScheme="blue" size="lg">
                  Enter API Keys
                </Button>
              </HStack>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Index;
