export default function SearchInput({ value, onChange, onFocus, onBlur }) {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder="Digite o username"
      onFocus={onFocus} 
      onBlur={onBlur}
    />
  );
}