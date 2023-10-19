import instance from "./axiosConfig";

const getAllMessagesBySenderIdAndReceiverId = (senderId, receiverId) => {
  return instance.get(`/api/messages/${senderId}/${receiverId}`)
}

const countUnreadMessagesByReceiverId = (receiverId) => {
  return instance.get(`/api/messages/count/${receiverId}`)
}

const changeStatusMessage = (senderId, receiverId) => {
  return instance.put(`/api/messages/change-status/${senderId}/${receiverId}`)
}

export {
  getAllMessagesBySenderIdAndReceiverId,
  countUnreadMessagesByReceiverId,
  changeStatusMessage
};