# Validation Notes

## Automated Validation

The required validator completed successfully on 21 August 2026 after the environment dependency `pyyaml` was installed.

```text
python3 /home/ubuntu/skills/skill-creator/scripts/quick_validate.py flagship-moat-research
Skill is valid!
```

A requirement-presence check also passed for the product-agnostic trigger, zero-fabrication rule, complete candidate coverage, high-demand lower-value classification, explicit no-go path, all eight scoring dimensions, buyer-choice proof, and per-candidate “what it is” explanation.

## Tabletop Review

The skill was reviewed against a hypothetical request to find a flagship for an unspecified web product with incomplete competitor evidence and one high-demand but easy-to-copy utility idea. The prescribed workflow directs the agent to:

1. Establish the live/documented product boundary before treating a capability as missing.
2. Label incomplete competitor evidence as **Unknown**, rather than asserting a gap.
3. Keep the high-demand utility in the candidate universe as a **growth utility** rather than silently rejecting it.
4. Require a full explanation of what the candidate is, its user problem, evidence, workflow, quality/cost boundary, buyer-choice proof, copy risk, score rationale, and decision status.
5. Return **research candidate** or **no flagship now** if demand, quality, buyer-choice, or feasibility remains unproven.

This review confirms that the skill supports broad candidate discovery while preserving the user’s zero-hallucination requirement.

## Two-Reviewer Quality-Gate Update

On 21 August 2026, the skill was strengthened with a mandatory final-verification protocol. The package was revalidated successfully. A targeted requirement check confirmed the presence of the **Evidence Auditor**, **Adversarial Strategy Reviewer**, **Two-reviewer closure**, **Final-quality attestation**, and the prohibition on falsely claiming that “two agents verified” a result.

The skill now requires all material evidence blockers to be resolved before a flagship verdict. If delegation is unavailable, it requires two independently scoped review passes and accurate disclosure of that limitation.
