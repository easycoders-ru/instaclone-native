import { useMutation, gql } from "@apollo/client";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { isLoggedInVar } from "../apollo";
import { AuthButton } from "../components/auth/AuthButton";
import { AuthLayout } from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AuthShared";

const LOGIN_MUTATTION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      error
      token
    }
  }
`;

export default function LogIn({ navigation }) {
  const passwordRef = useRef();

  const { register, handleSubmit, setValue, watch } = useForm();

  useEffect(() => {
    register("username", { required: true });
    register("password", { required: true });
  }, [register]);

  const onCompleted = (data) => {
    const {
      login: { ok, token },
    } = data;
    if (ok) {
      isLoggedInVar(true);
    }
  };

  const [login, { loading }] = useMutation(LOGIN_MUTATTION, { onCompleted });

  const onNext = (nextRef) => {
    nextRef?.current?.focus();
  };

  const onSubmitValid = (data) => {
    if (!loading) {
      login({
        variables: {
          ...data,
        },
      });
    }
  };

  return (
    <AuthLayout>
      <TextInput
        placeholder="Логин"
        placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
        returnKeyType="next"
        autoCapitalize="none"
        onSubmitEditing={() => {
          onNext(passwordRef);
        }}
        onChangeText={(text) => {
          setValue("username", text);
        }}
      />
      <TextInput
        ref={passwordRef}
        placeholder="Пароль"
        placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
        secureTextEntry
        lastOne
        returnKeyType="done"
        onChangeText={(text) => {
          setValue("password", text);
        }}
        onSubmitEditing={handleSubmit(onSubmitValid)}
      />

      <AuthButton
        text="Войти в аккаунт"
        loading={loading}
        disabled={!watch("username") || !watch("password")}
        onPress={handleSubmit(onSubmitValid)}
      />
    </AuthLayout>
  );
}
