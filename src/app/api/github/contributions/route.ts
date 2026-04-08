import { NextResponse } from "next/server";

const GITHUB_USERNAME = "asjad3";
const REVALIDATE = 3600; // 1 hour cache

export async function GET() {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    return NextResponse.json(
      { error: "GITHUB_TOKEN not configured" },
      { status: 503 }
    );
  }

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query($username: String!) {
            user(login: $username) {
              contributionsCollection {
                contributionCalendar {
                  totalContributions
                  weeks {
                    contributionDays {
                      date
                      contributionCount
                    }
                  }
                }
              }
            }
          }
        `,
        variables: { username: GITHUB_USERNAME },
      }),
      next: { revalidate: REVALIDATE },
    });

    if (!res.ok) {
      throw new Error(`GitHub API returned ${res.status}`);
    }

    const json = await res.json();
    const calendar = json.data?.user?.contributionsCollection?.contributionCalendar;

    if (!calendar) {
      throw new Error("No contribution data returned");
    }

    return NextResponse.json({ data: calendar });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch contributions" },
      { status: 500 }
    );
  }
}
