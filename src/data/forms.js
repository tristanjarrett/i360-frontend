import { gql } from '@apollo/client';

/**
 * Contact mutation query.
 */

export const CONTACT = gql`
  mutation CreateSubmissionMutation($name: String!, $email: String!, $enq: String!, $message: String!) {
    createSubmission(
      input: { clientMutationId: "CreateSubmission", name: $name, email: $email, enq: $enq, message: $message }
    ) {
      success
      data
    }
  }
`;

/**
 * Charity mutation query.
 */

export const CHARITY = gql`
  mutation CreateCharityMutation(
    $name: String!
    $email: String!
    $charityName: String!
    $charityNumber: String!
    $regAddress: String!
    $support: String!
  ) {
    createCharity(
      input: {
        clientMutationId: "CreateCharity"
        name: $name
        email: $email
        charityName: $charityName
        charityNumber: $charityNumber
        regAddress: $regAddress
        support: $support
      }
    ) {
      success
      data
    }
  }
`;

/**
 * Events mutation query.
 */

export const EVENTS = gql`
  mutation CreateEventsMutation(
    $name: String!
    $compName: String!
    $agent: String!
    $agentTerms: String!
    $contact: String!
    $postAddress: String!
    $email: String!
    $eventType: String!
    $typeOther: String!
    $desc: String!
    $date: String!
    $guests: String!
    $timings: String!
    $foodDrinks: String!
    $foodBevs: String!
    $pod: String!
    $publicFlight: String!
    $suppliersReq: String!
    $specialReq: String!
    $entReq: String!
    $specialReqEnt: String!
  ) {
    createEvents(
      input: {
        clientMutationId: "CreateEvents"
        name: $name
        compName: $compName
        agent: $agent
        agentTerms: $agentTerms
        contact: $contact
        postAddress: $postAddress
        email: $email
        eventType: $eventType
        typeOther: $typeOther
        desc: $desc
        date: $date
        guests: $guests
        timings: $timings
        foodDrinks: $foodDrinks
        foodBevs: $foodBevs
        pod: $pod
        publicFlight: $publicFlight
        suppliersReq: $suppliersReq
        specialReq: $specialReq
        entReq: $entReq
        specialReqEnt: $specialReqEnt
      }
    ) {
      success
      data
    }
  }
`;

/**
 * Resident mutation query.
 */

export const RESIDENT = gql`
  mutation CreateResidentMutation(
    $postCode: String!
    $phone: String!
    $name: String!
    $type: String!
    $address: String!
    $email: String!
    $headshot: String!
    $proofAddress: String!
    $proofId: String!
  ) {
    createResident(
      input: {
        clientMutationId: "CreateResident"
        postCode: $postCode
        phone: $phone
        name: $name
        type: $type
        address: $address
        email: $email
        headshot: $headshot
        proofAddress: $proofAddress
        proofId: $proofId
      }
    ) {
      success
      data
    }
  }
`;

/**
 * Proposal mutation query.
 */

export const PROPOSALS = gql`
  mutation CreateProposalsMutation(
    $name: String!
    $email: String!
    $date: String!
    $address: String!
    $requirements: String!
  ) {
    createProposals(
      input: {
        clientMutationId: "CreateProposals"
        name: $name
        email: $email
        date: $date
        address: $address
        requirements: $requirements
      }
    ) {
      success
      data
    }
  }
`;
