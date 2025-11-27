describe("Navigation Tests", () => {
  beforeEach(() => {
    // Visit the home page before each test
    cy.visit("/");
  });

  it("should load the home page by default", () => {
    // Verify the home page is displayed
    cy.get("[data-cy='home_header']").should("exist");
    cy.get("[data-cy='home_header']").should("contain", "Study Night");
  });

  it("should navigate to Card Sets page when clicking 'Card Sets' in the menu", () => {
    // Click on Card Sets in the navigation menu
    cy.get("#cardSetPage").click();

    // Verify the Card Sets page is displayed
    cy.get("[data-cy='study-set-header']").should("exist");
    cy.get("[data-cy='study-set-header']").should("contain", "Study Set Library");
  });

  it("should navigate to About page when clicking 'About' in the menu", () => {
    // Click on About in the navigation menu
    cy.get("#aboutPage").click();

    // Verify the About page is displayed
    cy.get("[data-cy='about_page']").should("exist");
    cy.get("[data-cy='about_page']").should("contain", "About Study Night");
  });

  it("should navigate to Home page when clicking 'Home' in the menu", () => {
    // First navigate away from home
    cy.get("#aboutPage").click();
    cy.get("[data-cy='about_page']").should("exist");

    // Click on Home in the navigation menu
    cy.get("#homePage").click();

    // Verify the Home page is displayed
    cy.get("[data-cy='home_header']").should("exist");
    cy.get("[data-cy='home_header']").should("contain", "Study Night");
  });

  it("should navigate between all pages correctly", () => {
    // Start at Home
    cy.get("[data-cy='home_header']").should("exist");

    // Navigate to Card Sets
    cy.get("#cardSetPage").click();
    cy.get("[data-cy='study-set-header']").should("exist");

    // Navigate to About
    cy.get("#aboutPage").click();
    cy.get("[data-cy='about_page']").should("exist");

    // Navigate back to Home
    cy.get("#homePage").click();
    cy.get("[data-cy='home_header']").should("exist");
  });
});
