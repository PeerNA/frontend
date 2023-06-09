import styled from 'styled-components';
import useModal from '../../lib/hooks/useModal';
import PeerNaBtn from './PeerNaBtn';

interface PeerNaModalProps {
  modalContent: string;
  subModalContent?: string;
  handleConfirmBtn?: () => void;
  handleCancelBtn?: () => void;
}
const PeerNaModal = (props: PeerNaModalProps) => {
  const { modalContent, subModalContent, handleConfirmBtn, handleCancelBtn } = props;

  const { toggleModal, togglePeerMatchModal, toggleProblemExitModal, isPeerMatchModal, isProblemExitModal } = useModal();

  const handleModalConfirm = () => {
    if (handleConfirmBtn) {
      handleConfirmBtn();
      if (isPeerMatchModal) togglePeerMatchModal();
      else if (isProblemExitModal) toggleProblemExitModal();
    } else toggleModal(false);
  };

  const handleModalCancle = () => {
    if (isPeerMatchModal) togglePeerMatchModal();
    else if (isProblemExitModal) toggleProblemExitModal();
    else toggleModal(false);

    if (handleCancelBtn) handleCancelBtn();
  };
  return (
    <St.ModalWrapper>
      <St.ModalSection>
        <p>{modalContent}</p>
        {subModalContent && <St.SubModalContent>{subModalContent}</St.SubModalContent>}
        <St.ButtonWrapper>
          {handleConfirmBtn && <PeerNaBtn content="확인" isActive={true} handleBtnClick={handleModalConfirm} />}
          <PeerNaBtn content="취소" isActive={false} handleBtnClick={handleModalCancle} />
        </St.ButtonWrapper>
      </St.ModalSection>
    </St.ModalWrapper>
  );
};

export default PeerNaModal;

const St = {
  ModalWrapper: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;

    width: 100%;
    height: 100%;
    padding: 0rem 6rem;

    background: rgba(0, 0, 0, 0.7);

    z-index: 10000;
  `,

  ModalSection: styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3rem;

    max-width: 60rem;
    padding: 3rem;

    border-radius: 1rem;
    border: 0.5rem solid ${({ theme }) => theme.colors.Peer_Color_Sky_2};
    background-color: ${({ theme }) => theme.colors.Peer_Color_White_2};

    & > p {
      padding: 2rem;
      text-align: center;
      ${({ theme }) => theme.fonts.Peer_Noto_B_Title_3};
    }
  `,
  SubModalContent: styled.div`
    width: 100%;
    padding: 3rem;
    ${({ theme }) => theme.fonts.Peer_Noto_M_SubTitle_1};
    background-color: ${({ theme }) => theme.colors.Peer_Color_Mint_1};
    border-radius: 1rem;
  `,
  ButtonWrapper: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 3.3rem;

    width: 100%;
  `,
};
