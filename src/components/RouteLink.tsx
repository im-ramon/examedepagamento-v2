import { useRouter } from 'next/router';

interface RouteLinkProps {
    href: string;
    text: string;
    underline: boolean;
}

function RouteLink({ href, text, underline }: RouteLinkProps) {
    const router = useRouter()

    const handleClick = (e: any) => {
        e.preventDefault()
        router.push(href)
    }

    return (
        <a href={href} onClick={e => handleClick(e)} className={underline ? '' : 'no-underline'}>
            {text}
        </a>
    )
}

export default RouteLink