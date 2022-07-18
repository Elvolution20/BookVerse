import React from 'react';
import {Box, Stack, Heading, Text} from "@chakra-ui/react"

interface Props {}

const Loading = (props: Props) => {
  return (
    <Box position="fixed" w="100%" h="100%" top="40%" zIndex="999" my="auto">
      <Box top="50%">
      <Stack spacing="1em" alignItems="center">
        <Box className="loading"></Box>
        <Box id="container">
          <Box className="Boxider" aria-hidden="true"></Box>
          <p className="loading-text" aria-label="Loading">
            <span className="letter" aria-hidden="true">B</span>
            <span className="letter" aria-hidden="true">o</span>
            <span className="letter" aria-hidden="true">o</span>
            <span className="letter" aria-hidden="true">k</span>
            <span className="letter" aria-hidden="true">v</span>
            <span className="letter" aria-hidden="true">e</span>
            <span className="letter" aria-hidden="true">r</span>
            <span className="letter" aria-hidden="true">s</span>
            <span className="letter" aria-hidden="true">e</span>
          </p>
        </Box>
      </Stack></Box>
    </Box>
  );
};

export default Loading;
