const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-5 h-5 ${props.className || ''}`}
  >
    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23ZM17.1548 9.69052C17.6151 9.23026 17.6151 8.48403 17.1548 8.02377C16.6945 7.56351 15.9483 7.56351 15.4881 8.02377L10.0357 13.4761L8.11909 11.5595C7.65883 11.0992 6.9126 11.0992 6.45234 11.5595C5.99208 12.0197 5.99208 12.766 6.45234 13.2262L9.20234 15.9762C9.6626 16.4365 10.4088 16.4365 10.8691 15.9762L17.1548 9.69052Z" fill="#6EA1B2"/>
  </svg>
);

export default CheckIcon;