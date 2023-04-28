import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({message, isUser}) => {
  return (
    <View
    style={[
      styles.messageContainer,
      isUser ? styles.userMessageContainer : styles.aiMessageContainer,
    ]}
  >
    <Text
      style={[
        styles.messageText,
        isUser ? styles.userMessageText : styles.aiMessageText,
      ]}
    >
      {message}
    </Text>
  </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    borderRadius: 10,
    marginBottom: 8,
    padding: 10,
    maxWidth: '70%',
  },
  userMessageContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#1a73e8',
    marginRight: 10,
  },
  aiMessageContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#e5e5e5',
    marginLeft: 10,
  },
  messageText: {
    fontSize: 16,
  },
  userMessageText: {
    color: '#fff',
  },
  aiMessageText: {
    color: '#333',
  },
});

export default ChatMessage;
