import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import ChatMessage from "../components/ChatMessage";
import { getChatReply } from "../utils/openai";

interface IMessage {
  id: number;
  message: string;
  isUser: boolean;
}

const ChatScreen: React.FC = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const sendMessage = async () => {
    if (input.trim().length === 0) return;
    const message: IMessage = {
      id: messages.length + 1,
      message: input,
      isUser: true,
    };

    setMessages([...messages, message]);
    setInput("");

    setIsLoading(true); // Set loading to true before sending the message

    try {
      const response = await getChatReply(input);
      const aiMessage: IMessage = {
        id: messages.length + 2,
        message: response,
        isUser: false,
      };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error("Error fetching AI reply:", error);
    } finally {
      setIsLoading(false); // Reset loading status once the message is sent
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={[...messages]}
        renderItem={({ item }) => (
          <ChatMessage message={item.message} isUser={item.isUser} />
        )}
        keyExtractor={(item) => item.id.toString()}
        style={styles.chatList}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setInput(text)}
          value={input}
          placeholder="Type your message..."
        />
        <TouchableOpacity
          onPress={sendMessage}
          style={styles.sendButton}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.sendButtonText}>Send</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
      },
      chatList: {
        paddingHorizontal: 10,
      },
      inputContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        padding: 10,
      },
      input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 8,
        fontSize: 16,
        marginRight: 10,
      },
      sendButton: {
        backgroundColor: '#1a73e8',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        width: 50,
        height: 50,
      },
      sendButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
      },
});

export default ChatScreen;
