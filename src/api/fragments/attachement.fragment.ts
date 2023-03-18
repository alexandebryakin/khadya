

import gql from 'graphql-tag';

export const NETWORK_FRAGMENT = gql`
  fragment AttachmentFields on Attachment {
    id
    contentType
    url
    createdAt
  }
`;
