import Social from "./social";

interface HeaderProps {
    title: string
    subtitle?: string
    enableSocial?: boolean
  }

export default function Header({title, subtitle, enableSocial = false}: HeaderProps) {
  return (
    <div>
      <div>
        <h1 className="mt-6 mb-2">{title}</h1>
        <p className="text-xl my-2">{subtitle}</p>
      </div>
      {enableSocial && <Social />}
      <hr className="mt-4 m-0" />
    </div>
  )
}