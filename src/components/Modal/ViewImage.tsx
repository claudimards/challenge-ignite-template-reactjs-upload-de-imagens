import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  // TODO MODAL WITH IMAGE AND EXTERNAL LINK
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW="max-content">
        <ModalBody p="0">
          <Image
            src={imgUrl}
            maxW="900px"
            maxH="600px"
            w="100%"
            m="auto%"
          />
        </ModalBody>

        <ModalFooter background="#353431" borderRadius="0 0 6px 6px" justifyContent="initial">
          <Link href={imgUrl} target='_blank'>Abrir original</Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
