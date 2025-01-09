import dynamoDB from "@/util/dbConnect";
import { comparePassword } from "@/lib/jwtToken";
import { createSession } from "@/lib/session";

export async function POST(request) {
  const { email, password } = await request.json();
  const params = {
    TableName: `${process.env.AWS_DB_NAME}admin`,
    FilterExpression: "email = :email",
    ExpressionAttributeValues: { ":email": email },
  };
  try {
    const user = await dynamoDB.scan(params).promise();
    if (user.Items.length == 0) {
      return Response.error({
        status: 401,
        body: "Unauthorized",
      });
    }
    const { id, password: hash } = user.Items[0];
    const isPasswordCorrect = await comparePassword(password, hash);

    if (!isPasswordCorrect) {
      return Response.error({
        status: 401,
        body: "Unauthorized",
      });
    }
    await createSession({
      userID: id,
      email,
    });
    return Response.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`);
  } catch (error) {
    console.log(error);
    return Response.error({
      status: 500,
      body: "Internal Server Error",
      message: error.message,
    });
  }
}
