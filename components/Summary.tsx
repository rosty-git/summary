import { ChangeEvent, useState } from 'react'
import { Card, Row, Text, Input, Button, FormElement, Spacer, Loading } from '@nextui-org/react'

export default function Summary() {

    const [url, setUrl] = useState("")
    const [summary, setSummary] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const summarizeUrl = async (url: string) => {
        setLoading(true)
        setSummary("")
        setError("")

        try {
            const response = await fetch("/api/summary", {
                method: "POST",
                body: JSON.stringify({url: url}),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            
            const { error, text } = await response.json()
            
            if (error) throw new Error(error)

            setSummary(text)
            
            
        } catch (e: unknown) {
            console.log(e)
            if (e instanceof Error) {
                setError(e.message)
            } else {
                setError("Unexpected error occured.")
            }

        } finally {
            setLoading(false)
        }

    }

    const handleChange = (e: ChangeEvent<FormElement>) => setUrl(e.target.value)

    return (
        <Card css={{ bg: "$black", h: "100vw" }}>
            <Card.Body>
                <Row justify="center" align="center">
                    <Input onChange={handleChange} label="Site URL" type="url"/>
                </Row>
                
                <Spacer y={1} />

                <Row justify="center" align="center">
                    <Button disabled={loading} onPress={() => summarizeUrl(url)} >Summarize</Button>
                </Row>
                
                <Spacer y={1} />
                <Card.Divider />
                <Spacer y={1} />

                <Row justify="center" align="center">
                    {error ? (
                        <Text color="error">{ error }</Text>
                    ) : (
                            loading ? <Loading type="points">Loading</Loading> : <Text>{ summary }</Text>
                    )}
                </Row>
            </Card.Body>
        </Card>
    )
}