import { Box, Text } from '@chakra-ui/react';
import React from 'react';

import type { Transaction } from 'types/api/transaction';

import { TX_TYPES } from 'toolkit/utils/consts';
import * as DetailedInfo from 'ui/shared/DetailedInfo/DetailedInfo';
import TextSeparator from 'ui/shared/TextSeparator';

type Props = Pick<Transaction, 'nonce' | 'type' | 'position'> & { queueIndex?: number };

const TxDetailsOther = ({ nonce, type, position, queueIndex }: Props) => {
  return (
    <>
      <DetailedInfo.ItemLabel
        hint="Other data related to this transaction"
      >
        Other
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        {
          [
            typeof type === 'number' && (
              <Box key="type">
                <Text as="span" fontWeight="500">Txn type: </Text>
                <Text fontWeight="600" as="span">{ type }</Text>
                { type === TX_TYPES.EIP1559 && <Text fontWeight="400" as="span" ml={ 1 } color="text.secondary">(EIP-1559)</Text> }
                { type === TX_TYPES.EIP4844 && <Text fontWeight="400" as="span" ml={ 1 } color="text.secondary">(EIP-4844)</Text> }
                { type === TX_TYPES.EIP7702 && <Text fontWeight="400" as="span" ml={ 1 } color="text.secondary">(EIP-7702)</Text> }
                { type === TX_TYPES.DEPOSIT && <Text fontWeight="400" as="span" ml={ 1 } color="text.secondary">(L2 Deposit)</Text> }
              </Box>
            ),
            queueIndex !== undefined ? (
              <Box key="queueIndex">
                <Text as="span" fontWeight="500">Queue index: </Text>
                <Text fontWeight="600" as="span">{ queueIndex }</Text>
              </Box>
            ) : (
              <Box key="nonce">
                <Text as="span" fontWeight="500">Nonce: </Text>
                <Text fontWeight="600" as="span">{ nonce }</Text>
              </Box>
            ),
            position !== null && position !== undefined && (
              <Box key="position">
                <Text as="span" fontWeight="500">Position: </Text>
                <Text fontWeight="600" as="span">{ position }</Text>
              </Box>
            ),
          ]
            .filter(Boolean)
            .map((item, index) => (
              <React.Fragment key={ index }>
                { index !== 0 && <TextSeparator/> }
                { item }
              </React.Fragment>
            ))
        }
      </DetailedInfo.ItemValue>
    </>
  );
};

export default TxDetailsOther;
