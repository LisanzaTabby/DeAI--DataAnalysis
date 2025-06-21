import Debug "mo:base/Debug";
import LLM "mo:llm";
import Array "mo:base/Array";

persistent actor {

  // Persistent storage for AI summaries
  stable var summaries : [Text] = [];

  // Save a new AI-generated summary
  public func saveSummary(summary : Text) : async () {
    summaries := Array.append<Text>(summaries, [summary]);
  };

  // Get all saved summaries
  public query func getSummaries() : async [Text] {
    return summaries;
  };

  // Prompt with a single message
  public func prompt(prompt : Text) : async Text {
    await LLM.prompt(#Llama3_1_8B, prompt);
  };

  // Chat with multiple messages
  public func chat(messages : [LLM.ChatMessage]) : async Text {
    let response = await LLM.chat(#Llama3_1_8B).withMessages(messages).send();

    switch (response.message.content) {
      case (?text) text;
      case null "";
    };
  };
};
