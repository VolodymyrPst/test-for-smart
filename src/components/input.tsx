interface Input {
  type: string | undefined;
  placeholder: string;
  name: string;
  toggle: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ type, placeholder, name, toggle }: Input) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={(e) => toggle(e)}
      className="input input-bordered input-primary w-full max-w-xs"
    />
  );
};

export default Input;
