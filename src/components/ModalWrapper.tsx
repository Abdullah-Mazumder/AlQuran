import React from "react";
import { Modal, View } from "native-base";
import { StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";

interface ModalWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  width?: string | number;
  placement: "top" | "bottom" | "left" | "right" | "center";
  children: React.ReactElement;
  animation?: string;
  duration?: number;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({
  isOpen,
  onClose,
  width = "90%",
  placement,
  children,
  animation = "bounceInDown",
  duration = 1000,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} safeAreaTop={true}>
      <Animatable.View
        animation={animation}
        duration={duration}
        className={`rounded-md overflow-hidden`}
        //@ts-ignore
        style={[[styles[placement]], { width: width }]}
      >
        {children}
      </Animatable.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  top: {
    marginBottom: "auto",
    marginTop: 50,
  },
  bottom: {
    marginBottom: 5,
    marginTop: "auto",
  },
  left: {
    marginLeft: 0,
    marginRight: "auto",
  },
  right: {
    marginLeft: "auto",
    marginRight: 0,
  },
  center: {
    marginBottom: "auto",
    marginTop: "auto",
    marginRight: "auto",
    marginLeft: "auto",
  },
});

export default ModalWrapper;
