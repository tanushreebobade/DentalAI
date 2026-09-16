import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface AppointmentCancellationEmailProps {
  patientName?: string;
  doctorName: string;
  appointmentDate: string;
  appointmentTime: string;
  cancellationReason?: string;
}

function AppointmentCancellationEmail({
  appointmentDate,
  appointmentTime,
  cancellationReason,
  doctorName,
  patientName,
}: AppointmentCancellationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your dental appointment has been cancelled</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoContainer}>
            <Img
              src="https://i.ibb.co.com/tRy6cC2/logo.png"
              width="50"
              height="50"
              alt="DentalAI"
              style={logo}
            />
            <Text style={logoText}>DentalAI</Text>
          </Section>

          <Heading style={h1}>Appointment Cancelled</Heading>

          <Text style={text}>Hi {patientName || "there"},</Text>

          <Text style={text}>
            Your dental appointment has been cancelled as requested. Here are the details of the cancelled appointment:
          </Text>

          <Section style={appointmentDetails}>
            <Text style={detailLabel}>Doctor</Text>
            <Text style={detailValue}>{doctorName}</Text>

            <Text style={detailLabel}>Date</Text>
            <Text style={detailValue}>{appointmentDate}</Text>

            <Text style={detailLabel}>Time</Text>
            <Text style={detailValue}>{appointmentTime}</Text>

            {cancellationReason && (
              <>
                <Text style={detailLabel}>Reason for Cancellation</Text>
                <Text style={detailValue}>{cancellationReason}</Text>
              </>
            )}

            <Text style={detailLabel}>Status</Text>
            <Text style={{ ...detailValue, color: "#dc2626" }}>Cancelled</Text>
          </Section>

          <Text style={text}>
            If you need to reschedule or book a new appointment at a time that works better for you, please visit our platform.
          </Text>

          <Section style={buttonContainer}>
            <Link style={button} href={(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000") + "/appointments"}>
              Book a New Appointment
            </Link>
          </Section>

          <Text style={footer}>
            Best regards,
            <br />
            The DentalAI Team
          </Text>

          <Text style={footerText}>
            If you did not request this cancellation or have questions, please contact us at support@dentalai.com
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export default AppointmentCancellationEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  maxWidth: "560px",
};

const logoContainer = {
  textAlign: "center" as const,
  marginBottom: "32px",
};

const logo = {
  borderRadius: "8px",
  display: "inline",
  verticalAlign: "middle",
};

const logoText = {
  fontSize: "20px",
  fontWeight: "bold",
  color: "#2563eb",
  margin: "0",
  display: "inline",
  marginLeft: "12px",
};

const h1 = {
  color: "#dc2626",
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center" as const,
  margin: "30px 0",
};

const text = {
  color: "#374151",
  fontSize: "16px",
  lineHeight: "26px",
  margin: "16px 0",
};

const appointmentDetails = {
  backgroundColor: "#fef2f2",
  border: "1px solid #fee2e2",
  borderRadius: "8px",
  padding: "24px",
  margin: "24px 0",
};

const detailLabel = {
  color: "#991b1b",
  fontSize: "13px",
  fontWeight: "600",
  textTransform: "uppercase" as const,
  letterSpacing: "0.5px",
  margin: "8px 0 4px 0",
};

const detailValue = {
  color: "#1f2937",
  fontSize: "16px",
  fontWeight: "600",
  margin: "0 0 16px 0",
};

const buttonContainer = {
  textAlign: "center" as const,
  margin: "32px 0",
};

const button = {
  backgroundColor: "#2563eb",
  borderRadius: "6px",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 24px",
};

const footer = {
  color: "#374151",
  fontSize: "16px",
  lineHeight: "26px",
  margin: "32px 0 16px 0",
};

const footerText = {
  color: "#6b7280",
  fontSize: "14px",
  lineHeight: "24px",
  margin: "16px 0 0 0",
  textAlign: "center" as const,
};
