export default function IntegrationsBool({ bool }) {
  return (
    <div
      className={`h-4 w-2/3 rounded-2xl ${
        bool ? 'bg-[#E6FF79]' : 'border border-[#E6FF79]'
      }`}
    ></div>
  )
}
