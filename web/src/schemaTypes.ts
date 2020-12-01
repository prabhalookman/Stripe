/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: meQuery
// ====================================================

export interface meQuery_me {
  __typename: "User";
  id: string;
  email: string;
  type: string | null;
  ccLast4: string | null;
}

export interface meQuery {
  me: meQuery_me | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CancelSubscriptionMutation
// ====================================================

export interface CancelSubscriptionMutation_cancelSubscription {
  __typename: "User";
  id: string;
  email: string;
  type: string | null;
  ccLast4: string | null;
}

export interface CancelSubscriptionMutation {
  cancelSubscription: CancelSubscriptionMutation_cancelSubscription | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ChangeCreditCardMutation
// ====================================================

export interface ChangeCreditCardMutation_changeCreditCard {
  __typename: "User";
  id: string;
  email: string;
  type: string | null;
  ccLast4: string | null;
}

export interface ChangeCreditCardMutation {
  changeCreditCard: ChangeCreditCardMutation_changeCreditCard | null;
}

export interface ChangeCreditCardMutationVariables {
  source: string;
  ccLast4: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateProductMutation
// ====================================================

export interface CreateProductMutation {
  createProduct: string | null;
}

export interface CreateProductMutationVariables {
  email: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateSubscriptionMutation
// ====================================================

export interface CreateSubscriptionMutation_createSubscription {
  __typename: "User";
  id: string;
  email: string;
  type: string | null;
  ccLast4: string | null;
}

export interface CreateSubscriptionMutation {
  createSubscription: CreateSubscriptionMutation_createSubscription | null;
}

export interface CreateSubscriptionMutationVariables {
  source: string;
  ccLast4: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: customerLS
// ====================================================

export interface customerLS_customerList {
  __typename: "Customer";
  id: string;
  email: string;
  currency: string;
  invoice_prefix: string;
}

export interface customerLS {
  customerList: (customerLS_customerList | null)[] | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: LoginMutation
// ====================================================

export interface LoginMutation_login {
  __typename: "User";
  id: string;
  email: string;
  type: string | null;
}

export interface LoginMutation {
  login: LoginMutation_login | null;
}

export interface LoginMutationVariables {
  email: string;
  password: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RegisterMutation
// ====================================================

export interface RegisterMutation {
  register: boolean;
}

export interface RegisterMutationVariables {
  email: string;
  password: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UserInfo
// ====================================================

export interface UserInfo {
  __typename: "User";
  id: string;
  email: string;
  type: string | null;
  ccLast4: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
