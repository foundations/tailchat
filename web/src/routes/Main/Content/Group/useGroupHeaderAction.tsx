import { closeModal, openModal } from '@/components/Modal';
import { GroupDetail } from '@/components/modals/GroupDetail';
import { GroupInvite } from '@/components/modals/GroupInvite';
import React from 'react';
import { useCallback } from 'react';
import { useHistory } from 'react-router';
import { quitGroup, showAlert, t, useIsGroupOwner } from 'tailchat-shared';

/**
 * 群组 Header 的操作 hooks
 */
export function useGroupHeaderAction(groupId: string) {
  const isOwner = useIsGroupOwner(groupId);
  const history = useHistory();

  const handleShowGroupDetail = useCallback(() => {
    const key = openModal(
      <GroupDetail
        groupId={groupId}
        onClose={() => {
          closeModal(key);
        }}
      />
    );
  }, [groupId]);

  const handleInviteUser = useCallback(() => {
    openModal(<GroupInvite groupId={groupId} />);
  }, [groupId]);

  const handleQuitGroup = useCallback(() => {
    showAlert({
      message: isOwner
        ? t('您是群组管理者，退出群组会导致解散群组')
        : t('确定要退出群组么?'),
      async onConfirm() {
        await quitGroup(groupId);
        history.replace('/main'); // 返回到主页
      },
    });
  }, [groupId, isOwner]);

  return { isOwner, handleShowGroupDetail, handleInviteUser, handleQuitGroup };
}
