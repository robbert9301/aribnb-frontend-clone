import {
  Box,
  Button,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import {
  FaEnvelope,
  FaLock,
  FaRegAddressCard,
  FaUserCircle,
} from "react-icons/fa";
import { IUsernameSignUpVariables, usernameSignUp } from "../api";
import SocialLogin from "./SocialLogin";

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SignUpModal({ isOpen, onClose }: SignUpModalProps) {
  const toast = useToast();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUsernameSignUpVariables>();
  const mutation = useMutation(usernameSignUp, {
    onMutate: () => {},
    onSuccess: (data) => {
      toast({
        title: "Create account successful.",
        status: "success",
        variant: "left-accent",
        position: "top",
      });
      console.log(data);
      onClose();
      reset();
      queryClient.refetchQueries(["me"]);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const onSubmit = ({
    name,
    email,
    username,
    password,
    currency,
    gender,
    language,
  }: IUsernameSignUpVariables) => {
    mutation.mutate({
      name,
      email,
      username,
      password,
      currency,
      gender,
      language,
    });
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Sign Up</ModalHeader>
        <ModalCloseButton aria-label="Close login layer" />
        <ModalBody as={"form"} onSubmit={handleSubmit(onSubmit)}>
          <VStack alignItems={"flex-start"}>
            <Box w="100%">
              <FormLabel htmlFor="name">User Name</FormLabel>
              <InputGroup>
                <InputLeftElement children={<FaRegAddressCard />} />
                <Input
                  id="name"
                  {...register("name", {
                    required: "Please enter your name.",
                  })}
                  variant={"filled"}
                  placeholder="Enter your name"
                />
              </InputGroup>
              <Box role={"alert"} w={"100%"} color={"red.600"}>
                {errors.name?.message}
              </Box>
            </Box>
            <Box w="100%">
              <FormLabel htmlFor="email">Email</FormLabel>
              <InputGroup>
                <InputLeftElement children={<FaEnvelope />} />
                <Input
                  id="email"
                  {...register("email", {
                    required: "Please enter your email.",
                  })}
                  variant={"filled"}
                  placeholder="Enter you email"
                />
              </InputGroup>
              <Box role={"alert"} w={"100%"} color={"red.600"}>
                {errors.email?.message}
              </Box>
            </Box>
            <Box w="100%">
              <FormLabel htmlFor="username">User ID</FormLabel>
              <InputGroup>
                <InputLeftElement children={<FaUserCircle />} />
                <Input
                  id="username"
                  {...register("username", {
                    required: "Please enter your ID.",
                  })}
                  variant={"filled"}
                  placeholder="Enter User ID"
                />
              </InputGroup>
              <Box role={"alert"} w={"100%"} color={"red.600"}>
                {errors.username?.message}
              </Box>
            </Box>
            <Box w="100%">
              <FormLabel htmlFor="password">Password</FormLabel>
              <InputGroup>
                <InputLeftElement children={<FaLock />} />
                <Input
                  id="password"
                  {...register("password", {
                    required: "Please enter your password.",
                  })}
                  variant={"filled"}
                  type={"password"}
                  placeholder="Enter Password"
                />
              </InputGroup>
              <Box role={"alert"} w={"100%"} color={"red.600"}>
                {errors.password?.message}
              </Box>
            </Box>
            <Box w="100%">
              <FormLabel>currency</FormLabel>
              <Select
                placeholder="currency option"
                {...register("currency", { required: true })}
              >
                <option value="won">Korean won</option>
                <option value="usd">Dollar</option>
              </Select>
            </Box>
            <Box w="100%">
              <FormLabel>gender</FormLabel>
              <Select
                placeholder="gender option"
                {...register("gender", { required: true })}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Select>
            </Box>
            <Box w="100%">
              <FormLabel>language</FormLabel>
              <Select
                placeholder="language option"
                {...register("language", { required: true })}
              >
                <option value="kr">Korean</option>
                <option value="en">English</option>
              </Select>
            </Box>
          </VStack>
          <HStack mt={"4"}>
            <Button
              isLoading={mutation.isLoading}
              type={"submit"}
              colorScheme={"red"}
              width={"100%"}
            >
              Create Account
            </Button>
          </HStack>
          <SocialLogin />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
