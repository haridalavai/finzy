import axios from "axios";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";

const useRequest = ({ url, method, body, onSuccess, onErrors }) => {
  const toast = useToast();
  const [errors, setErrors] = useState(null);
  const [hasErrors, setHasErrors] = useState(false);

  const doRequest = async (props = {}) => {
    try {
      setErrors(null);
      const response = await axios[method](url, { ...body, ...props });
      const messages = response.data.message;

      if (onSuccess) {
        onSuccess(response.data);
        // console.log(response);
        if (messages !== undefined) {
          messages.map((msg) => {
            toast({
              title: `${msg}`,

              status: "success",
              duration: 5000,
              isClosable: true,
              position: "top-right",
            });
          });
        }
      }

      return response;
    } catch (err) {
      console.log(err);
      if (onErrors) {
        onErrors(hasErrors);
      }
      setHasErrors(true);
      setErrors(
        <div className="alert alert-danger">
          <ul>
            {err.response.data.errors.map((err) =>
              toast({
                title: `${err.message}`,

                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top-right",
              })
            )}
            {}
          </ul>
        </div>
      );
    }
  };
  return { doRequest, errors };
};

export default useRequest;
