import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
} from "@nextui-org/modal";

export default function BlogDetailsModal({ details }: { details: string }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen}>Show Details</Button>
      <Modal isOpen={isOpen} size="4xl" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <div
                  dangerouslySetInnerHTML={{ __html: details }}
                  className="p-5 text-justify"
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
