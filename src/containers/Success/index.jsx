import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import qs from "query-string";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter
} from "@chakra-ui/modal";
import { Text, Button } from "@chakra-ui/react";

function Success() {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const { newuser } = qs.parse(location.search);
    if (newuser && newuser === "true") {
      setIsModalOpen(true);
    }
  }, [location]);

  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div>success</div>
      <Modal isOpen={isModalOpen} onClose={onCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Welcome!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>New user message</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={onCloseModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Success;
