declare namespace google {
  namespace accounts {
    namespace id {
      function initialize(config: {
        client_id: string;
        callback: (response) => void;
      }): void;
      function prompt(): void;
    }
  }
}
