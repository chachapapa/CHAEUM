import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ModalStateType = {
  isOpen: boolean;
  modalType: string;
};

const initialState: ModalStateType = {
  isOpen: false,
  modalType: '',
};

const modalSlice = createSlice({
  name: 'modalOpener',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.modalType = action.payload;
    },
    closeModal: state => {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
// export const selectModal = state => state.modal;
export default modalSlice.reducer;
