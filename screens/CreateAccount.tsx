import React, { RefObject, useRef } from "react";
import { gql, useMutation } from "@apollo/client";
import { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AuthShared";
import { NavigationProp } from "@react-navigation/native";
import { createAccount } from "../__generated/createAccount";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $username: String!
    $email: String!
    $name: String!
    $location: String!
    $password: String!
    $avatarURL: String!
    $githubUsername: String!
  ) {
    createAccount(
      username: $username
      email: $email
      name: $name
      location: $location
      password: $password
      avatarURL: $avatarURL
      githubUsername: $githubUsername
    ) {
      ok
      error
    }
  }
`;

export default function CreateAccount({ navigation }: { navigation: NavigationProp<{ LogIn: { username: string, password: string }}>}) {
  const { register, handleSubmit, setValue, getValues } = useForm();
  const onCompleted = (data: createAccount) => {
    const {
      createAccount: { ok },
    } = data;
    const { username, password } = getValues();
    if (ok) {
      navigation.navigate("LogIn", {
        username,
        password,
      });
    }
  };
  const [createAccountMutation, { loading }] = useMutation(
    CREATE_ACCOUNT_MUTATION,
    {
      onCompleted,
    }
  );

  const onValid = (data: FieldValues) => {
    if (!loading) {
      createAccountMutation({
        variables: {
          ...data,
        },
      });
    }
  };

  useEffect(() => {
    register("username", {
      required: true,
    });
    register("email", {
      required: true,
    });

    register("name", {
      required: true,
    });
    register("location", {
      required: true,
    });
    register("password", {
      required: true,
    });
    register("avatarURL", {
      required: true,
    });
    register("githubUsername", {
      required: true,
    });
  }, [register]);
  return (
    <AuthLayout>
      <TextInput
        placeholder="Username"
        autoCapitalize="none"
        returnKeyType="next"
        placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
        onChangeText={(text) => setValue("username", text)}
      />
      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        returnKeyType="next"
        placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
        onChangeText={(text) => setValue("email", text)}
      />
      <TextInput
        placeholder="Name"
        returnKeyType="next"
        placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
        onChangeText={(text) => setValue("name", text)}
      />
      <TextInput
        placeholder="Location"
        returnKeyType="next"
        placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
        onChangeText={(text) => setValue("location", text)}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        returnKeyType="done"
        lastOne={true}
        placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
        onChangeText={(text) => setValue("password", text)}
      />
      <TextInput
        placeholder="AvatarURL"
        returnKeyType="next"
        placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
        onChangeText={(text) => setValue("avatarURL", text)}
      />
      <TextInput
        placeholder="githubUsername"
        returnKeyType="next"
        placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
        onChangeText={(text) => setValue("githubUsername", text)}
      />
      <AuthButton
        text="Create Account"
        disabled={false}
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  );
}