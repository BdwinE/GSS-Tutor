/**
 * Exposes application Events.
 * @module config/eventTypes
 */
module.exports = {
  // Client -> Server
  // System
  JOIN_ROOM: 'JOIN_ROOM',
  JOIN_ROOMS: 'JOIN_ROOMS',
  LEAVE_ROOM: 'LEAVE_ROOM',
  LEAVE_ROOMS: 'LEAVE_ROOMS',
  // Authors
  ARCHIVE_AUTHOR: 'ARCHIVE_AUTHOR',
  DELETE_AUTHOR: 'DELETE_AUTHOR',
  UPDATE_AUTHOR: 'UPDATE_AUTHOR',
  // Messages
  ARCHIVE_MESSAGE: 'ARCHIVE_MESSAGE',
  CREATE_MESSAGE: 'CREATE_MESSAGE',
  DELETE_MESSAGE: 'DELETE_MESSAGE',
  UPDATE_MESSAGE: 'UPDATE_MESSAGE',
  // Rooms
  ARCHIVE_ROOM: 'ARCHIVE_ROOM',
  CREATE_ROOM: 'CREATE_ROOM',
  DELETE_ROOM: 'DELETE_ROOM',
  UPDATE_ROOM: 'UPDATE_ROOM',

  // Server -> Client
  // System
  ROOM_JOINED: 'ROOM_JOINED',
  ROOMS_JOINED: 'ROOMS_JOINED',
  ROOM_LEFT: 'ROOM_LEFT',
  ROOMS_LEFT: 'ROOMS_LEFT',
  // Authors
  AUTHOR_ARCHIVED: 'AUTHOR_ARCHIVED',
  AUTHOR_DELETED: 'AUTHOR_DELETED',
  AUTHOR_UPDATED: 'AUTHOR_UPDATED',
  // Messages
  MESSAGE_ARCHIVED: 'MESSAGE_ARCHIVED',
  MESSAGE_CREATED: 'MESSAGE_CREATED',
  MESSAGE_DELETED: 'MESSAGE_DELETED',
  MESSAGE_UPDATED: 'MESSAGE_UPDATED',
  // Rooms
  ROOM_ARCHIVED: 'ROOM_ARCHIVED',
  ROOM_CREATED: 'ROOM_CREATED',
  ROOM_DELETED: 'ROOM_DELETED',
  ROOM_UPDATED: 'ROOM_UPDATED',
};
