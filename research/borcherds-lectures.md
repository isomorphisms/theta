# Richard Borcherds: elliptic- and theta-function lectures

This is a research summary, not a transcript. I distinguish material directly verified from the public video descriptions/transcript indexes from reconstruction of the mathematical path where a complete transcript was not publicly indexed.

Primary series: Richard E. Borcherds, **Elliptic functions**, four lectures, February 2024.

1. [Elliptic functions 1. Weierstrass function](https://www.youtube.com/watch?v=7kPKICWkVG0) — 32:05, 18 Feb 2024.
2. [Elliptic functions lecture 2](https://www.youtube.com/watch?v=c59ozRhz6Bw) — 35:13, 19 Feb 2024.
3. [Elliptic functions lecture 3. Jacobi functions](https://www.youtube.com/watch?v=AAa9VeE6QuU) — 32:48, 21 Feb 2024.
4. [Elliptic functions lecture 4. The sigma function](https://www.youtube.com/watch?v=c--3czekwug) — 24:29, 24 Feb 2024.

The first lecture's description explicitly says that its pictures of elliptic functions come from Jahnke and Emde, *Tables of Functions with Formulae and Curves*. See [`../sources/jahnke-emde.md`](../sources/jahnke-emde.md).

There are also two directly relevant lectures in Borcherds's earlier **Modular forms** series:

- Lecture 8, **Theta functions** — 18:32.
- Lecture 9, **Theta functions in higher dimensions** — 22:36.

A bilingual mirror indexes both in sequence with the rest of the modular-forms course: <https://www.bilibili.com/video/BV1STkpYRE5A/>.

## Source confidence

- **Lecture 1:** title, length, stated scope, and Jahnke–Emde reference are directly verified from the YouTube record. The detailed mathematical outline below is a reconstruction of the standard Weierstrass development consistent with that scope.
- **Lecture 2:** title/description are verified, and an indexed transcript-derived summary exposes much of the argument. This is the strongest detailed lecture summary in this file.
- **Lecture 3:** title/description directly verify the central subjects: `sn`, `cn`, `dn`, and their interpretation as sections of order-2 line bundles. Detailed connective material is reconstructed from those topics.
- **Lecture 4:** an indexed transcript exposes Borcherds's opening statement that the lecture is about theta functions and that the particular theta function is called sigma. The remaining outline is reconstructed from the standard sigma-function development and from where this lecture sits after lectures 1–3.
- **Modular forms 8–9:** the course index and topics are verified; the detailed outline is a topic-level reconstruction of Borcherds's standard short treatment of lattice theta series.

I have not found an explicit paper citation in the four 2024 video descriptions or the indexed portions of the transcripts. The only explicit bibliographic reference verified so far is Jahnke–Emde. Names such as Weierstrass, Jacobi, Riemann, and Heisenberg are mathematical/historical attributions, not automatically bibliography entries.

---

# Elliptic functions 1: Weierstrass function

## The problem

An elliptic function is a meromorphic function on the complex plane with two independent periods. Choose a lattice

\[
\Lambda=\mathbb Z\omega_1+\mathbb Z\omega_2,
\qquad \omega_1/\omega_2\notin\mathbb R.
\]

Periodicity means that the true domain is not really the whole plane but the quotient torus

\[
\mathbb C/\Lambda.
\]

This immediately changes what functions are possible. A holomorphic elliptic function would descend to a holomorphic function on a compact Riemann surface and hence be constant. Nontrivial elliptic functions therefore have poles.

The basic construction problem is: **given a lattice, produce explicit meromorphic functions having exactly that lattice of periods.**

## Why a naive sum fails and Weierstrass's correction works

The most obvious attempt is to put a double pole at every lattice point:

\[
\sum_{\omega\in\Lambda}\frac1{(z-\omega)^2}.
\]

The lattice sum needs convergence control. Weierstrass subtracts the constant term at every nonzero lattice point:

\[
\wp(z)=\frac1{z^2}+
\sum_{\omega\in\Lambda\setminus\{0\}}
\left(
\frac1{(z-\omega)^2}-\frac1{\omega^2}
\right).
\]

The subtraction does not alter the pole at `z = ω`, but improves convergence because the summand now decays one order faster in `ω`.

## Immediate structure of \(\wp\)

The construction makes several facts visible:

- `\wp` has a double pole at every lattice point and no other poles.
- `\wp` is even: `\wp(-z)=\wp(z)`.
- Its derivative `\wp'` is odd and has triple poles at lattice points.
- Translating by a lattice vector leaves `\wp` unchanged.

Because `z` and `-z` have the same `\wp` value, `\wp` should be thought of as the natural degree-two map from the torus to the Riemann sphere. The special fixed points of `z↦-z` are the half-periods; their `\wp` values become the branch values.

## Laurent expansion and lattice invariants

Expanding near zero produces only even powers after the leading `z^{-2}` term. The coefficients are lattice sums (Eisenstein series). Conventionally one packages the first important ones as `g₂` and `g₃`.

The key algebraic relation is

\[
(\wp'(z))^2=4\wp(z)^3-g_2\wp(z)-g_3.
\]

So the pair

\[
z\longmapsto (x,y)=(\wp(z),\wp'(z))
\]

lies on a cubic curve

\[
y^2=4x^3-g_2x-g_3.
\]

This is the first major conceptual conversion in the series: **a complex torus described analytically by periods is the same object, after adding the point at infinity, as a nonsingular cubic described algebraically.**

## Why the old pictures matter

Borcherds explicitly points to Jahnke–Emde for the pictures. Those pictures do not plot the real and imaginary parts separately. Emde's stated convention is to make a relief surface whose height is the modulus `|f(z)|`. That is especially good for elliptic functions because periodic poles, zeros, and the repeating lattice become immediately visible.

For a future game this is not incidental historical decoration: it is already a concrete rendering rule for the complex function.

---

# Elliptic functions 2: addition law and cubic curve

The public description says the subject is the **addition formula for the Weierstrass P function**. The indexed transcript summary exposes the geometric route Borcherds takes.

## From a torus to a cubic

Borcherds starts from the same map

\[
z\mapsto (\wp(z),\wp'(z))
\]

into

\[
y^2=4x^3-g_2x-g_3.
\]

The quotient `C/Λ` is topologically a torus. The cubic is another model of the same object. The point is not merely that the two sets correspond: **addition on the torus becomes the chord-and-tangent group law on the cubic.**

## Counting zeros and poles

A basic elliptic-function theorem is proved with the argument principle. For an elliptic function `f`, integrate `f'/f` around the boundary of a fundamental parallelogram. Opposite sides cancel by periodicity, so the integral is zero. Hence, counted with multiplicity,

**number of zeros = number of poles**

inside a fundamental domain.

A slightly refined contour integral, using `z f'(z)/f(z)`, gives the companion constraint

**sum of zeros = sum of poles modulo the lattice.**

This is one of the structural facts behind the addition law and later behind sigma products: a divisor of a genuine elliptic function has degree zero and a balancing condition in the torus.

## Collinearity is addition

Take three points on the cubic corresponding to parameters `z₁,z₂,z₃`. A line meets a nonsingular cubic in three points counting multiplicity. Borcherds packages the collinearity condition using a determinant involving `1`, `\wp`, and `\wp'`.

As a function of one parameter, that determinant is elliptic. Its pole order forces exactly three zeros in a fundamental region. Two zeros are already supplied by the two known intersection points; the zero/pole-sum rule identifies the third. The result is the familiar statement:

\[
P(z_1),P(z_2),P(z_3)\text{ collinear}
\quad\Longleftrightarrow\quad
z_1+z_2+z_3=0\pmod\Lambda.
\]

Reflecting the third intersection across the `x` axis therefore realizes addition.

This gives the addition formula for `\wp` without treating it as a miraculous symbolic identity. The formula is forced by the geometry of a cubic and the group structure already present on `C/Λ`.

## Projective embeddings

The lecture then looks at maps built from elliptic functions with controlled pole order, roughly the sequence generated by

\[
1,\wp,\wp',\wp^2,\ldots
\]

and asks how much projective space is needed to see the torus faithfully.

- With too few functions, the map collapses the torus.
- The `\wp` map alone is essentially two-to-one because it identifies `z` and `-z`.
- The three functions `1,\wp,\wp'` give the cubic embedding in projective 2-space.
- Higher pole-order systems give higher-degree embeddings such as a degree-four model in projective 3-space.

The underlying theme is already the language later used for theta functions: functions with prescribed transformation/pole behavior form finite-dimensional spaces, and a basis of such a space maps the torus into projective space.

---

# Elliptic functions 3: Jacobi functions and order-two line bundles

The verified description says explicitly:

> We describe the Jacobi functions sn, cn, dn, and show how to view them as sections of order 2 line bundles.

That last clause is the conceptual reason this lecture belongs immediately before sigma/theta functions.

## Jacobi's coordinate system

Where Weierstrass uses one even function `\wp` and its odd derivative, Jacobi packages elliptic behavior in three related functions

\[
\operatorname{sn}u,\qquad
\operatorname{cn}u,\qquad
\operatorname{dn}u.
\]

They satisfy algebraic relations

\[
\operatorname{sn}^2u+\operatorname{cn}^2u=1,
\]

\[
\operatorname{dn}^2u+k^2\operatorname{sn}^2u=1,
\]

and differential relations

\[
(\operatorname{sn}u)'=\operatorname{cn}u\operatorname{dn}u,
\]

\[
(\operatorname{cn}u)'=-\operatorname{sn}u\operatorname{dn}u,
\]

\[
(\operatorname{dn}u)'=-k^2\operatorname{sn}u\operatorname{cn}u.
\]

The modulus `k` changes the shape of the period lattice and therefore changes the geometry of the functions.

## Periodicity versus sign changes

A central visual fact is that translating by certain half-periods need not return exactly the same scalar value. A Jacobi function can return with a minus sign or another simple multiplier. On a larger lattice it is an ordinary elliptic function; on the smaller torus the correct object is not an honest scalar-valued function.

That is why Borcherds introduces the line-bundle interpretation.

## Sections rather than functions

A function on the universal cover can obey a law of the form

\[
f(z+\omega)=j_\omega(z)f(z)
\]

instead of strict periodicity `f(z+ω)=f(z)`. The factors `j_ω` tell us how to glue the trivial fibers over different copies of the fundamental parallelogram. The descended object is a **section of a line bundle** over the torus.

For the Jacobi functions in this lecture the relevant multipliers have order two: after enough translation, the sign disappears. This is the first clean step away from “elliptic function = doubly periodic scalar function” toward “theta function = quasi-periodic section.”

## Geometric point

This resolves what otherwise looks like annoying bookkeeping. A sign change under translation is not a defect. It says the function is globally living in a nontrivial one-dimensional bundle. Theta functions are naturally of this type.

For visualization this suggests a richer state than simply `|f|`: the modulus can be periodic while phase/sign records the bundle twisting.

---

# Elliptic functions 4: sigma as a theta function

The indexed opening transcript is unusually explicit. Borcherds says that the lecture is about **theta functions**, and that the particular theta function under discussion is the **sigma function**. He jokes that he does not know why this theta function is called sigma rather than theta, then immediately motivates its construction.

## What sigma fixes

Weierstrass `\wp` is excellent for describing elliptic functions but awkward if the desired data are *zeros*. The sigma function is built to have simple zeros precisely at lattice points.

A standard Weierstrass product is

\[
\sigma(z)
=z\prod_{\omega\in\Lambda\setminus\{0\}}
\left(1-\frac z\omega\right)
\exp\left(\frac z\omega+\frac{z^2}{2\omega^2}\right).
\]

The exponential correction makes the infinite product converge while leaving its zero set unchanged.

## Sigma is deliberately not elliptic

An entire elliptic function would have to be constant, so a nonconstant entire function with zeros at all lattice points cannot be genuinely doubly periodic. Sigma instead transforms **quasi-periodically**:

\[
\sigma(z+\omega)=\text{nonzero exponential factor}\times\sigma(z).
\]

This is exactly the line-bundle phenomenon from lecture 3 in a more important form. Sigma is naturally a section, not a globally single-valued scalar function on the torus.

## Sigma, zeta, and \(\wp\)

Logarithmic differentiation strips away the product structure:

\[
\zeta(z)=\frac{\sigma'(z)}{\sigma(z)},
\qquad
\wp(z)=-\zeta'(z).
\]

So the sequence

\[
\sigma\longrightarrow\zeta\longrightarrow\wp
\]

moves from an entire quasi-periodic object with prescribed zeros, to a quasi-periodic meromorphic logarithmic derivative, to a genuinely elliptic doubly periodic function.

Jahnke–Emde's printed p.100 begins its section “Definition of the Sigma- and the Zeta-function” immediately after its Weierstrass material, which is exactly the same conceptual progression.

## Constructing elliptic functions from divisors

If one wants an elliptic function with zeros `a₁,…,a_m` and poles `b₁,…,b_m`, sigma provides the factors directly:

\[
F(z)=C\frac{\prod_i\sigma(z-a_i)}{\prod_j\sigma(z-b_j)}.
\]

Equal numbers of zero and pole factors cancel the degree. The additional balancing condition

\[
\sum_i a_i\equiv\sum_j b_j\pmod\Lambda
\]

cancels the residual quasi-periodic multiplier (up to the conventional exponential normalization). This is the sigma-function incarnation of the zero/pole theorem proved in lecture 2.

The four-lecture arc therefore closes tightly:

1. `\wp` gives a canonical elliptic function and cubic model.
2. Zero/pole arithmetic explains the addition law.
3. Jacobi functions force us to accept sections with multipliers.
4. Sigma/theta makes quasi-periodicity the main construction and lets divisors generate elliptic functions.

---

# Modular forms 8: theta functions

This lecture belongs to Borcherds's modular-forms course rather than the 2024 elliptic-functions mini-series, but it is directly relevant to the project.

## The basic theta series

Start with the one-dimensional Gaussian lattice sum, in a common normalization

\[
\theta(\tau)=\sum_{n\in\mathbb Z}e^{\pi i n^2\tau},
\qquad \Im \tau>0.
\]

The important point is not merely convergence. The same sum transforms in a controlled way when `τ` is acted on by modular substitutions.

The translation transformation follows from the parity/integrality of `n²` after choosing the appropriate normalization and congruence subgroup. The inversion transformation

\[
\tau\mapsto-1/\tau
\]

comes from **Poisson summation** applied to the Gaussian. The Fourier transform of a Gaussian is another Gaussian, which is why theta is modular.

## Half-integral weight

The square-root factor in the inversion formula is the first warning that theta has weight `1/2` rather than an ordinary integral weight. One therefore meets a multiplier system / metaplectic issue rather than an ordinary scalar modular form for `SL₂(Z)`.

## Zeta functional equation

Taking a Mellin transform of the theta series (after removing the constant term) produces the completed Riemann zeta function. Splitting the integral at `1` and applying the theta inversion formula yields the functional equation of zeta.

This is a very clean causal chain:

**Gaussian Fourier transform → Poisson summation → theta modularity → zeta functional equation.**

That chain is worth preserving as a possible game progression because every arrow can be made computational/visual rather than merely symbolic.

---

# Modular forms 9: theta functions in higher dimensions

## Lattice theta series

Replace `Z` by a Euclidean lattice `L` and sum over its vectors:

\[
\Theta_L(\tau)=\sum_{x\in L}q^{(x,x)/2}.
\]

The coefficient of `q^m` counts lattice vectors of squared norm `2m`. The theta function is therefore simultaneously an analytic modular object and a generating function for concrete geometry of the lattice.

## Poisson summation and the dual lattice

Higher-dimensional Poisson summation transforms `L` into its dual lattice `L^*`. Schematically,

\[
\Theta_L(-1/\tau)
\sim (\tau/i)^{n/2}\,\operatorname{vol}(L)^{-1}\Theta_{L^*}(\tau).
\]

If `L` is unimodular, then `L=L^*`; if it is also even, the translation law is clean. Thus an even unimodular lattice of dimension `n` produces a modular form of weight `n/2`.

The familiar divisibility constraint on the dimension of a positive-definite even unimodular lattice (dimension divisible by 8) is reflected in the available modular weights and transformation law.

## E8 and the Leech lattice

In dimension 8 the theta series of the `E8` lattice is forced into a very small space of modular forms, giving strong information about the number of vectors of each norm. In dimension 24 the Leech lattice provides the spectacular example with no norm-2 vectors; its first nontrivial coefficient counts its minimal vectors.

This is where modular-form rigidity turns geometric counting into something almost automatic: once the weight and first few coefficients are constrained, the rest of the theta series has very little room to move.

## Spectra and non-uniqueness

A flat torus built from a lattice has Laplace spectrum controlled by lengths in the dual lattice, hence by a theta series. Different lattices can have the same theta series and therefore the same spectrum while not being geometrically isometric. This is one route into “hearing the shape” phenomena and is a useful warning: a theta series can encode a great deal without encoding everything.

---

# What this sequence contributes to a theta-function game

This research suggests not starting from a generic graph of `θ(z,τ)`. Borcherds's sequence supplies a more physical progression:

1. **Lattice / torus:** the plane repeats under two translations.
2. **Poles and zeros:** periodic analytic structure is constrained globally.
3. **Cubic law:** torus addition becomes visible as collinearity.
4. **Jacobi phase/sign:** translating can change a state while preserving modulus.
5. **Line bundle:** that change is structure, not an error.
6. **Sigma:** place zeros on purpose and build functions from them.
7. **Heat/Gaussian theta:** modularity arises from Fourier self-duality.
8. **Lattice theta series:** geometry becomes a generating function, then a modular form.

That is enough material for several mechanically distinct games rather than one “theta graphing” application.
