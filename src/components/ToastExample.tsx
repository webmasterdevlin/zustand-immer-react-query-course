import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { useToast } from '../hooks/use-toast';

const ToastExample = () => {
    const { toast } = useToast();

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle>Toast Examples</CardTitle>
                <CardDescription>Try different types of toasts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <Button
                    variant="default"
                    className="w-full"
                    onClick={() => {
                        toast({
                            title: "Success!",
                            description: "Your action was completed successfully.",
                        });
                    }}
                >
                    Show Success Toast
                </Button>

                <Button
                    variant="destructive"
                    className="w-full"
                    onClick={() => {
                        toast({
                            variant: "destructive",
                            title: "Error!",
                            description: "Something went wrong. Please try again.",
                        });
                    }}
                >
                    Show Error Toast
                </Button>

                <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                        toast({
                            title: "Info",
                            description: "This is an informational message.",
                        });
                    }}
                >
                    Show Info Toast
                </Button>
            </CardContent>
        </Card>
    );
};

export default ToastExample;
