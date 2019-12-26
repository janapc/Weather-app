import React from 'react';
import {
  ScrollView,
  Platform,
  Modal,
  KeyboardAvoidingView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import { ContainerModal, BackgroundModal, TitleMenu } from './styles';
import Search from '../../components/Search';

export default function OpenModal({
  handleModal,
  modalVisible,
  handleLocationSelected,
}) {
  return (
    <Modal animationType="fade" transparent visible={modalVisible}>
      <KeyboardAvoidingView
        style={{ backgroundColor: '#00000059' }}
        enabled
        behavior={Platform.OS === 'android' ? undefined : 'padding'}
      >
        <ScrollView scrollEnabled={false} keyboardShouldPersistTaps="handled">
          <ContainerModal>
            <BackgroundModal>
              <Icon
                onPress={() => handleModal(false)}
                name="close"
                color="2b283d"
                style={{
                  marginVertical: 10,
                  marginRight: 5,
                  alignSelf: 'flex-end',
                }}
                size={32}
              />
              <TitleMenu>Search your City</TitleMenu>
              <Search onLocationSelected={handleLocationSelected} />
            </BackgroundModal>
          </ContainerModal>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
}

OpenModal.propTypes = {
  handleModal: PropTypes.func.isRequired,
  modalVisible: PropTypes.bool.isRequired,
  handleLocationSelected: PropTypes.func.isRequired,
};
